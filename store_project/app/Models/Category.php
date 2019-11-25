<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'code',
        'user_id'
    ];

//    protected $hidden = ['id'];

//    public function products()
//    {
//        return $this->belongsToMany('App\Models\Product','category_product');
//    }

    public function products()
    {
        return $this->hasMany('App\Models\Product');
    }
}
