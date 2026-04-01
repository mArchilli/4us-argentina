<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->enum('shipping_method', ['domicilio', 'sucursal']);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('dni');
            $table->string('province');
            $table->string('city');
            $table->string('postal_code');
            $table->string('shipping_company');
            $table->string('address')->nullable();
            $table->string('phone');
            $table->text('observations')->nullable();
            $table->decimal('subtotal', 12, 2);
            $table->decimal('shipping_cost', 12, 2)->nullable();
            $table->decimal('total', 12, 2);
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
