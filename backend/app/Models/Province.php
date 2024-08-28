<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Schema;

class Province extends Resources
{
  use HasFactory;

  protected $table = 'province';
  protected $fillable = ['name', 'island_id'];

  protected $forms = [
    [
      'name' => 'name',
      'required' => true,
      'column' => 4,
      'label' => 'name',
      'type' => 'text',
      'display' => true
    ]
  ];

  protected $hidden = [];

  protected $rules = [
    'name' => ['required', 'string', 'max:255']
  ];

  protected $searchable = [
    'name'
  ];

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

  public function getCity()
  {
    return $this->hasMany(City::class);
  }

  public function island()
  {
    return $this->belongsTo(Island::class);
  }

  public function cities(): HasMany
  {
    return $this->hasMany(City::class, 'id_provinsi');
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
