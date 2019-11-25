<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $username = $this->genString(5);
        //  $request->request->add(['username' => $username]);

        $validator = Validator::make($request->all(), [
            'mobile' => 'required',
            'password' => 'required',

        ]);

        if (!$validator->fails()) {
            while (User::where('username',$username)->count() == 1) {
                $username = $this->genString(5);
            }

            $user = User::create([
                'mobile' => $request->mobile,
                'password' => $request->password,
                'username' => $username,
            ]);


            $token = auth()->login($user);


            $data = [
                'access_token' => $token,
                'token_type'   => 'bearer',
                'expires_in'   => auth('api')->factory()->getTTL() * 60
            ];

//            return view('home',compact('token'));
            return jsend_success($data);
            //  return $this->respondWithToken($token);
        } else {
            return jsend_error('Invalid Input Data');
        }
    }

    public function login(Request $request)
    {

        $credentials = request(['username', 'password']);
        $credentials_with_mobile = [
            'mobile' => $credentials['username'],
            'password' => $credentials['password']
        ];

        $credentials_with_username = [
            'username' => $credentials['username'],
            'password' => $credentials['password']
        ];

        if (!(($token = auth()->attempt($credentials_with_username)) || ($token = auth()->attempt($credentials_with_mobile)))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60
        ]);
    }

    function genString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }


}
