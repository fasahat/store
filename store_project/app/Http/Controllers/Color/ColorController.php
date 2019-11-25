<?php

namespace App\Http\Controllers\Color;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Color;
use Validator;
use Exception;

class ColorController extends Controller
{

    public function index(Request $request)
    {
        try {
            $colors = Color::get();
            return jsend_success($colors);

        } catch (Exception $e) {
            return jsend_error($e->getMessage());
        }
    }

    public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'code' => 'required',
        ]);


        if (!$validator->fails()) {
            try {
                $color = Color::create([
                    'name' => $request->name,
                    'code' => $request->code,
                ]);

                $data = ['name' => $request->get('name')];
                return jsend_success($data);

            } catch (Exception $e) {
                return jsend_error($e->getMessage());
            }

        } else {
            return jsend_error('Invalid Input Data');
        }
    }
}
