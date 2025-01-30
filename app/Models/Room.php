<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;
    protected $fillable = [
        'Room_Number',
        'Status',
        'roomtype_id'
    ];
    public function roomType()
    {
        return $this->belongsTo(RoomType::class);
    }
}
