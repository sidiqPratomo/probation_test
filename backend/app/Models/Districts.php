<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Schema;

class Districts extends Resources
{
    use HasFactory;

    protected $table = 'districts';

    protected $fillable = [
        'name',
        'district_code',
        'city_code'
    ];

    protected $rules = [
        'name' => ['required', 'string', 'max:255'],
        'district_code' => ['required', 'string', 'max:11'],
        'city_code' => ['required', 'string', 'max:11'],
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

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class, 'city_code');
    }

    public function getCity()
    {
        return $this->belongsTo(City::class);
    }

    public function getTableFields()
    {
        return Schema::getColumnListing($this->getTable());
    }

    public function scopeApplySearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            return $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('district_code', 'like', "%{$search}%");
            });
        });
    }
}
