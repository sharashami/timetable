<?php

namespace Core;

abstract class JWT
{
    private static $header = ['typ' => 'JWT', 'alg' => 'HS256'];
    private static $payload = [
      //emissor 'iss'
    ];
    private static $secretKey = "Projeto-Faculdade@OsmiraTia";
    private static $timeStamp;

    public static function newToken($data = null)
    {
        date_default_timezone_set('America/Fortaleza');
        //criação
        self::$payload['iat'] = time();
        //expira
        self::$payload['exp'] = time() + (7 * 24 * 60 * 60);

        if ($data) {
            // self::$payload['iss'] = $data['user'];
            self::$payload['data'] = $data;
        }
        
        $header = base64_encode(json_encode(self::$header));
        $payload = base64_encode(json_encode(self::$payload));
        $header_payload = $header . "." . $payload;
        $signature = base64_encode(hash_hmac('sha256', $header_payload, self::$secretKey, true));
        
        $token = $header_payload . '.' . $signature;
        
        return $token;
    }

    public static function checkToken($token) : bool
    {
        $token = explode('.', $token);
        $signature = $token[2];
        $header_payload = $token[0] . "." .$token[1];
        $secretKey = base64_encode(hash_hmac('sha256', $header_payload, self::$secretKey, true));

        if (self::validateDate(getPayload($token)['exp']) && $signature === $secretKey) {
            return true;
        }
        return false;
    }

    public static function getPayload($token)
    {
        $token = explode('.', $token);
        return json_decode(base64_decode($token[1]));
    }

    function validateDate($date)
    {
        return time() < $date;
    }
}
