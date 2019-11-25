<?php

namespace App\Http\Controllers\Search;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{


    public function search(Request $request)
    {

        $common = ['name','RAM'];
        $searchData = $request->all();
        $whereClause = [];

        foreach ($searchData as $key => $item) {

            if (in_array($key,$common)) {
                array_push($whereClause, [ $key, 'like', '%'.$item.'%']);
                unset($searchData[$key]);
            }
        }


        $queries = Product::where($whereClause);

        foreach ($searchData as $key => $value) {
            $table = '';
            switch ($key) {
                case 'color' :
                    $table = 'colors';
                    $queries = $queries->WhereHas($table, function ($query) use ($value) {
                        $query->where('color_id', '=', $value);
                    });
                    break;
                case 'internal_storage' :
                    $table = 'internal_storage';
//                    $queries = $queries->WhereHas($table, function ($query) use ($value) {
//                        $query->where($key, '=', '%'.$value.'%');
//                    });
                    break;
                default:
                    break;
                }
        }

        $results = $queries->get();
        return jsend_success($results);
    }
}
