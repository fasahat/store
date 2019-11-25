<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'company_id',
        'name',
        'RAM',
        'color_id',
        'cpu_id',
        'user_id'
    ];

    public function Category()
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function colors()
    {
        return $this->belongsToMany('App\Models\Color','color_product');

    }
}
