<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'author',
        'isbn',
        'total_copies',
        'available_copies',
        'file_path',
        'description',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
