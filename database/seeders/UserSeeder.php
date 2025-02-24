<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create('id_ID'); // Inisialisasi Faker untuk bahasa Indonesia

        for ($i = 0; $i < 10; $i++) {
            User::create([
                'username' => $faker->userName, // Generate username acak
                'password' => Hash::make('password123'), // Hash password
                'email' => $faker->unique()->email, // Generate email acak yang unik
                'nama' => $faker->name, // Gunakan $faker->name, bukan $faker->nama
            ]);
        }
    }
}