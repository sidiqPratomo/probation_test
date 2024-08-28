<?php

namespace App\Models;

use App\Services\FilterQuery;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class City extends Resources
{
  use HasFactory;

  protected $table = 'city';
  protected $fillable = ['name', 'id_provinsi'];
  protected $searchable = ['name', 'id_provinsi'];

  protected $forms = [
    [
      'name' => 'name',
      'required' => true,
      'column' => 4,
      'label' => 'name',
      'type' => 'text',
      'display' => true
    ],
    [
      'id_provinsi' => 'id_provinsi',
      'required' => true,
      'column' => 4,
      'label' => 'id_provinsi',
      'type' => 'text',
      'display' => true
    ]

  ];

  protected $hidden = [];

  protected $rules = [
    'name' => ['required', 'string', 'max:255'],
    'id_provinsi' => ['required', 'string', 'max:11']
  ];

  public function province(): BelongsTo
  {
    return $this->belongsTo(Province::class, 'id_provinsi');
  }

  public function getProvince()
  {
    return $this->belongsTo(Province::class);
  }

  public function getRules()
  {
    return $this->rules;
  }
  public function getFields()
  {
    return $this->fillable;
  }

  public function getForms()
  {
    return $this->forms;
  }

  public function checkTableExists($table_name)
  {
    return Schema::hasTable($table_name);
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
                    ->orWhere('id', 'like', "%{$search}%");
            });
        });
    }
}
