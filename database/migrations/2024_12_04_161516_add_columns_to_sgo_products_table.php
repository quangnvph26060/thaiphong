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
        Schema::table('sgo_products', function (Blueprint $table) {
            // Xóa ràng buộc khóa ngoại trước
            $table->dropForeign(['company_id']);
            $table->dropForeign(['country_id']);

            // Xóa cột liên quan đến khóa ngoại
            $table->dropColumn('company_id');
            $table->dropColumn('country_id');

            // Xóa các cột khác
            $table->dropColumn('source');
            $table->dropColumn('condition_level');

            // Thêm cột mới
            $table->bigInteger('sale_price')->default(0);
            $table->longText('sub_description')->nullable();
            $table->string('title_seo')->nullable();
            $table->string('description_seo')->nullable();
            $table->text('keyword_seo')->nullable();
            $table->string('main_image')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            // $table->foreign('category_id')->references('sgo_categories')->on('id')->nullOnDelete();
            $table->foreignId('category_id')->references('id')->on('sgo_categories')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sgo_products', function (Blueprint $table) {
            //
        });
    }
};
