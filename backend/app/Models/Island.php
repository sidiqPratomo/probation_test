<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Island extends Resources
{
    use HasFactory;

    protected $fillable = ['name'];

    public function provinces()
    {
        return $this->hasMany(Province::class);
    }

    public function scopeApplySearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            return $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%");
            });
        });
    }
}
