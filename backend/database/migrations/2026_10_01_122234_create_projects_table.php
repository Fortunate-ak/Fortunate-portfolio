<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('num')->nullable();
            $table->string('name');
            $table->text('desc');
            $table->string('category')->default('Full-Stack');
            $table->json('tags')->nullable();
            $table->string('stars')->default('0');
            $table->string('href')->nullable();
            $table->string('live')->nullable();
            $table->string('image')->nullable();
            $table->string('color')->default('#06b6d4');
            $table->boolean('is_featured')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
