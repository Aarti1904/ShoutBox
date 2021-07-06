<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class approvals extends Model
{
    use HasFactory;

    protected $primaryKey = 'id'; // or null

    public $incrementing = false;

    protected $keyType = 'string';
}
