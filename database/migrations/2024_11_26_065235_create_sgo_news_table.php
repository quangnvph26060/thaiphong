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
        Schema::create('sgo_news', function (Blueprint $table) {
            $table->id();
            $table->string('subject')->nullable();
            $table->dateTime('posted_at')->nullable();
            $table->longText('article')->nullable();
            $table->bigInteger('view')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sgo_news');
    }
};
