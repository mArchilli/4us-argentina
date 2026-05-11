<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('offer_price');
            $table->unsignedTinyInteger('offer_discount_percent')->nullable()->after('offer_active');
            $table->string('offer_scope', 10)->default('retail')->after('offer_discount_percent');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['offer_discount_percent', 'offer_scope']);
            $table->decimal('offer_price', 10, 2)->nullable()->after('offer_active');
        });
    }
};
