<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => '4usagugliagonzalez@gmail.com'],
            [
                'name' => 'Pablo | Sol',
                'password' => Hash::make('charusagugliagonzalez'),
            ]
        );
    }
}
