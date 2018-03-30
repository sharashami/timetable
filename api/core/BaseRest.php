<?php
namespace Core;

use OutOfRangeException;

abstract class BaseRest
{
    protected $model;

    protected $routes = [];

    protected $request;

    protected $params = [];

    private $endPoint;

    // public $_allow = [];
    private $content_type = "application/json";

    protected $method;

    // private $_code = 200;
    public function __construct()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
        header("Access-Control-Allow-Headers: Origin, X-Request-Width, Content-Type, Accept");
        header("Access-Control-Max-Age: 86400");
        header("Access-Control-Allow-Credentials: true");
        // header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
        // header("Access-Control-Expose-Headers: Access-Control-Allow-Origin");
        $this->method = $this->getMethod();
        $this->getRequest($this->method);
        $this->getModel();
    }

    private function setHeaders()
    {
        // header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        // header("HTTP/1.1 " . $this->_code . " " . $this->getStatusMessage());
        header('Content-Type: ' . $this->content_type . '; charset=utf-8');
    }

    private function getAuthorization()
    {
        if (isset(getallheaders()['Authorization'])) {
            list ($type, $data) = explode(" ", getallheaders()['Authorization'], 2);
            if (strcasecmp($type, "Bearer") == 0) {
                print_r($data);
            } else {
                echo "eita";
            }
        } else {
            echo "nao tem nada";
        }
    }

    public function isRest($rest)
    {
        $tam = sizeof($rest);
        
        $endpoitsCandidates = array_filter($r = $this->routes[$this->method], function ($r) use ($tam) {
            return sizeof(explode("/", $r)) === $tam;
        }, ARRAY_FILTER_USE_KEY);
        
        foreach ($endpoitsCandidates as $key => $value) :
            $r = array_udiff_assoc(explode("/", $key), $rest, function ($a, $b) use ($key) {
                if (($a != $b && preg_match("/^:/", $a) != 0)) {
                    $this->params[$key][substr($a, 1)] = $b;
                    return - 1;
                } else if ($a === $b)
                    return - 1;
            });
            if (sizeof($r) === $tam && isset($this->routes[$this->method][$r = implode("/", $r)]))
                $this->endPoint = $r;
        endforeach;
        
        if(isset($this->params[$this->endPoint]))
            $this->params = $this->params[$this->endPoint];
        else
            unset($this->params);
        
        return $this;
        
        // $rest_temp = $rest;
        
        // if (sizeof($rest_temp) > 1) {
        // $rest_temp[1] = ":id";
        // }
        
        // // foreach ($rest_temp as $value) {
        // // if(is_numeric($value))
        // // $value = ":id";
        // // }
        
        // $rest_temp = implode('/', $rest_temp);
        
        // if (isset($this->routes[$this->method][$rest_temp])) {
        // $this->endPoint = implode('/', $rest);
        // $rest = $this->routes[$this->method][$rest_temp];
        // unset($this->routes[$this->method][$rest_temp]);
        // $this->routes[$this->method][$this->endPoint] = $rest;
        // }
        // return $this;
    }

    public function run()
    {
        if ($this->endPoint) {
            $action = $this->routes[$this->method][$this->endPoint];
            if (method_exists($this, $action)) {
                $this->$action($this->request);
            } else {
                echo "Método não existe";
            }
        } else {
            echo "Endpoit não existe!";
        }
    }

    public function getMethod()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    public function response($data = "", $cod = 200)
    {
        $this->setHeaders();
        http_response_code($cod);
        echo json_encode($data);
        exit();
    }

    private function getRequest($method)
    {
        switch ($method) {
            case "POST":
                // $this->request = $this->cleanInputs($_POST);
                $this->request = json_decode(file_get_contents('php://input'), true);
                break;
            case "GET":
            case "DELETE":
                $this->request = $this->cleanInputs($_GET);
                break;
            case "PUT":
                parse_str(file_get_contents("php://input"), $this->request);
                break;
            default:
                $this->response('', 405);
                break;
        }
    }

    protected function add($method, $routes)
    {
        foreach ($routes as $r) {
            $this->routes[$method][$r[0]] = $r[1];
        }
    }

    private function cleanInputs($data)
    {
        $clean_input = array();
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $clean_input[$k] = $this->cleanInputs($v);
            }
        } else {
            if (get_magic_quotes_gpc()) {
                $data = trim(stripslashes($data));
            }
            $data = strip_tags($data);
            $clean_input = trim($data);
        }
        return $clean_input;
    }

    private function getModel()
    {
        if (class_exists($model = str_replace([
            "Rest"
        ], "Model", get_class($this))))
            $this->model = new $model();
    }

    protected final function getParam($param)
    {
        if (isset($this->params[$param]))
            return $this->params[$param];
        throw new OutOfRangeException("O parametro de URL: $param não existe!");
    }
    
    // private function set_headers() {
    // header("HTTP/1.1 " . $this->_code . " " . $this->get_status_message());
    // header("Content-Type:" . $this->_content_type);
    // http_response_code(501);
    // }
}
