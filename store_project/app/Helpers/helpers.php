<?php


if (!function_exists("jsend_error")) {

    function jsend_error($message, $code = 10200, $data = null, $extraHeaders = [])
    {
        $response = [
            "status" => "error",
            "code" => $code,
            "message" => $message
        ];

        return response()->json($response);

    }
}


if (!function_exists("jsend_success")) {

    function jsend_success($data = [], $code = 10100, $extraHeaders = [])
    {
        $response = [
            "status" => "success",
            "status_code" => $code,
        ];

        !is_null($data) && $response['data'] = $data;

        return response()->json($response);

    }
}

if (!function_exists("decodeToken")) {

    function decodeToken($token)
    {
        $token = str_replace('Bearer ', '', $token);
        JWTAuth::setToken($token);
        $user = JWTAuth::toUser();
        return $user;

    }
}
