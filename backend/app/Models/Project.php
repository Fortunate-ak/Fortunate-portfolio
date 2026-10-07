<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'num',
        'name',
        'desc',
        'category',
        'tags',
        'stars',
        'href',
        'live',
        'image',
        'color',
        'is_featured',
        'display_order',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_featured' => 'boolean',
        'display_order' => 'integer',
    ];
}
