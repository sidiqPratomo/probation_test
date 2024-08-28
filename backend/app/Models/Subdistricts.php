<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Schema;

class Subdistricts extends Resources
{
    use HasFactory;

    protected $table = 'subdistricts';

    protected $fillable = [
        'name',
        'subdistrict_code',
        'district_code'     
    ];

    protected $rules = [
        'name'        => ['required', 'string', 'max:255'],
        'subdistrict_code' => ['required', 'string', 'max:20'],
        'district_code' => ['required', 'string', 'max:11'],
    ];

    public function getRules()
    {
        return $this->rules;
    }
    public function getFields()
    {
        return $this->fillable;
    }

    public function checkTableExists($table_name)
    {
        return Schema::hasTable($table_name);
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(Districts::class, 'district_code');
    }

    public function getDistrict(){
        return $this->belongsTo(Districts::class);
    }

    public function scopeApplySearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            return $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('subdistrict_code', 'like', "%{$search}%");
            });
        });
    }
}
