<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Borrowing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'status',
        'borrow_date',
        'due_date',
        'return_date',
        'fine_amount',
        'is_fine_paid',
        'fine_paid_at',
    ];

    protected $casts = [
        'borrow_date' => 'date',
        'due_date'    => 'date', 
        'return_date' => 'date',
        'fine_paid_at' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
