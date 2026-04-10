<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {

    #region Producto 1: Bandeja metálica 4US – Edición diseño animado
        // ── 1. Category ────────────────────────────────────────────────────
        $categoryName = 'Bandeja metalica';
        $category = Category::firstOrCreate(
            ['slug' => Str::slug($categoryName)],
            ['name' => $categoryName],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description = '<p><strong>Bandeja metálica 4US para armar</strong> – Sumá estilo a tu ritual con esta bandeja pensada para quienes disfrutan cada detalle. Con un <em>diseño inspirado en ilustraciones animadas icónicas</em> y un acabado vibrante, esta bandeja no solo cumple su función, sino que también destaca como <strong>pieza de colección</strong>.</p>'
            . '<p>Fabricada en <strong>metal resistente</strong>, ofrece una superficie amplia y bordes elevados que facilitan el armado y mantienen todo en su lugar, evitando pérdidas y desorden. Ideal para uso diario, tanto en casa como para llevar.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Material metálico resistente:</strong> Fabricación duradera para uso intensivo diario.</li>'
            . '<li><strong>Bordes curvos:</strong> Mayor comodidad y retención del material al armar.</li>'
            . '<li><strong>Superficie amplia:</strong> Fácil de limpiar y cómoda para el armado.</li>'
            . '<li><strong>Diseño exclusivo:</strong> Arte animado clásico con colores vibrantes.</li>'
            . '<li><strong>Versátil:</strong> Perfecta para uso personal o reventa en tabaquería.</li>'
            . '</ul>'
            . '<p>Disponible por unidad o en <strong>venta mayorista</strong>. Un producto que combina funcionalidad y estética, ideal para potenciar el catálogo de tu <strong>tabaquería</strong> o <strong>smoke shop</strong>.</p>';

        $product = Product::firstOrCreate(
            ['title' => 'Bandeja metálica 4US – Edición diseño animado'],
            [
                'description' => $description,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product->prices()->doesntExist()) {
            $product->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 7000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 5 unidades',
                    'min_quantity' => 5,
                    'price'        => 5000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product->media()->createMany([
                [
                    'file_path'  => $basePath . '/Bandeja-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Bandejas-general.JPG',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product->categories()->syncWithoutDetaching([$category->id]);
    #endregion

    #region Producto 2: Bandeja metálica 4US – Edición diseño animado (variante 2)
        // ── 1. Category (same) ─────────────────────────────────────────────
        $category2 = Category::firstOrCreate(
            ['slug' => Str::slug('Bandeja metalica')],
            ['name' => 'Bandeja metalica'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description2 = '<p><strong>Bandeja metálica 4US para armar</strong> – Llevá tu experiencia al siguiente nivel con esta bandeja diseñada para los amantes del estilo y la practicidad. Su <em>ilustración animada con estética pop art</em> la convierte en un accesorio único que combina <strong>funcionalidad y diseño</strong>.</p>'
            . '<p>Fabricada en <strong>metal de alta resistencia</strong>, cuenta con una superficie generosa y bordes elevados que evitan pérdidas de material durante el armado. Compacta y liviana, ideal para llevar a cualquier lado.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Metal resistente:</strong> Construida para un uso prolongado sin deformaciones.</li>'
            . '<li><strong>Bordes elevados:</strong> Mantienen el material contenido mientras armás.</li>'
            . '<li><strong>Fácil limpieza:</strong> Superficie lisa que se limpia en segundos.</li>'
            . '<li><strong>Diseño pop art:</strong> Estética animada vibrante y llamativa.</li>'
            . '<li><strong>Multiuso:</strong> Ideal para uso personal o como producto de reventa.</li>'
            . '</ul>'
            . '<p>Disponible por unidad o en <strong>compra mayorista</strong>. Accesorio imprescindible para cualquier <strong>tabaquería</strong>, <strong>grow shop</strong> o revendedor.</p>';

        $product2 = Product::firstOrCreate(
            ['title' => 'Bandeja metálica 4US – Edición diseño animado (variante 2)'],
            [
                'description' => $description2,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product2->prices()->doesntExist()) {
            $product2->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 7000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 5 unidades',
                    'min_quantity' => 5,
                    'price'        => 5000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product2->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product2->media()->createMany([
                [
                    'file_path'  => $basePath . '/Bandeja-2-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-2-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Bandejas-general.JPG',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product2->categories()->syncWithoutDetaching([$category2->id]);
    #endregion

    #region Producto 3: Bandeja metálica 4US – Edición diseño animado (variante 3)
        // ── 1. Category (same) ─────────────────────────────────────────────
        $category3 = Category::firstOrCreate(
            ['slug' => Str::slug('Bandeja metalica')],
            ['name' => 'Bandeja metalica'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description3 = '<p><strong>Bandeja metálica 4US para armar</strong> – Descubrí la combinación perfecta entre arte y funcionalidad. Esta bandeja presenta un <em>diseño animado con paleta de colores intensos</em> que la hace destacar como pieza única dentro de cualquier <strong>colección de accesorios</strong>.</p>'
            . '<p>Su construcción en <strong>metal reforzado</strong> garantiza durabilidad y resistencia al uso diario. Los bordes redondeados y elevados facilitan el armado sin desperdiciar material, manteniendo todo ordenado en un solo lugar.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Construcción robusta:</strong> Metal resistente a golpes y caídas.</li>'
            . '<li><strong>Bordes redondeados:</strong> Diseñados para una experiencia de armado cómoda.</li>'
            . '<li><strong>Superficie antiadherente:</strong> Limpieza rápida y sin residuos.</li>'
            . '<li><strong>Arte exclusivo:</strong> Ilustración animada con colores intensos y vibrantes.</li>'
            . '<li><strong>Para todos:</strong> Uso personal, regalo o reventa en comercios.</li>'
            . '</ul>'
            . '<p>Comprá por unidad o aprovechá los precios de <strong>venta por mayor</strong>. Producto ideal para sumar al stock de tu <strong>tabaquería</strong> o <strong>smoke shop</strong>.</p>';

        $product3 = Product::firstOrCreate(
            ['title' => 'Bandeja metálica 4US – Edición diseño animado (variante 3)'],
            [
                'description' => $description3,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product3->prices()->doesntExist()) {
            $product3->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 7000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 5 unidades',
                    'min_quantity' => 5,
                    'price'        => 5000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product3->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product3->media()->createMany([
                [
                    'file_path'  => $basePath . '/Bandeja-3-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-3-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Bandejas-general.JPG',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product3->categories()->syncWithoutDetaching([$category3->id]);
    #endregion

    #region Producto 4: Bandeja metálica 4US – Edición diseño animado (variante 4)
        // ── 1. Category (same) ─────────────────────────────────────────────
        $category4 = Category::firstOrCreate(
            ['slug' => Str::slug('Bandeja metalica')],
            ['name' => 'Bandeja metalica'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description4 = '<p><strong>Bandeja metálica 4US para armar</strong> – Un accesorio que une practicidad con <strong>diseño urbano</strong>. Esta variante presenta una <em>gráfica animada con trazos urbanos y colores llamativos</em>, ideal para quienes buscan un estilo diferente y auténtico.</p>'
            . '<p>Fabricada íntegramente en <strong>metal duradero</strong>, ofrece estabilidad, bordes contenedores y una superficie de trabajo amplia para un armado limpio y eficiente. Perfecta para el día a día o para salidas.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Metal de alta calidad:</strong> Resistente al desgaste y uso constante.</li>'
            . '<li><strong>Bordes contenedores:</strong> Evitan pérdidas y mantienen el orden.</li>'
            . '<li><strong>Superficie lisa:</strong> Armado cómodo y limpieza sin esfuerzo.</li>'
            . '<li><strong>Estilo urbano:</strong> Diseño con trazos gráficos de alto impacto visual.</li>'
            . '<li><strong>Ideal para reventa:</strong> Producto de alta rotación en tabaquerías.</li>'
            . '</ul>'
            . '<p>Disponible por unidad y en <strong>venta mayorista</strong> con precios especiales. Potenciá tu negocio con accesorios de calidad para tu <strong>tabaquería</strong> o <strong>grow shop</strong>.</p>';

        $product4 = Product::firstOrCreate(
            ['title' => 'Bandeja metálica 4US – Edición diseño animado (variante 4)'],
            [
                'description' => $description4,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product4->prices()->doesntExist()) {
            $product4->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 7000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 5 unidades',
                    'min_quantity' => 5,
                    'price'        => 5000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product4->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product4->media()->createMany([
                [
                    'file_path'  => $basePath . '/Bandeja-4-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-4-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Bandejas-general.JPG',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product4->categories()->syncWithoutDetaching([$category4->id]);
    #endregion

    #region Producto 5: Bandeja metálica 4US – Edición diseño animado (variante 5)
        // ── 1. Category (same) ─────────────────────────────────────────────
        $category5 = Category::firstOrCreate(
            ['slug' => Str::slug('Bandeja metalica')],
            ['name' => 'Bandeja metalica'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description5 = '<p><strong>Bandeja metálica 4US para armar</strong> – Cerrá tu colección con esta bandeja de <em>estética retro inspirada en animaciones clásicas</em>. Un accesorio que combina <strong>nostalgia y funcionalidad</strong> en un diseño pensado para verdaderos conocedores.</p>'
            . '<p>Construida en <strong>metal resistente de primera calidad</strong>, esta bandeja cuenta con bordes elevados y una superficie amplia que facilita cada armado. Liviana, compacta y duradera, es la compañera ideal para el uso cotidiano.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Metal premium:</strong> Máxima resistencia y durabilidad garantizada.</li>'
            . '<li><strong>Bordes elevados:</strong> Control total del material durante el armado.</li>'
            . '<li><strong>Superficie generosa:</strong> Espacio amplio para armar con comodidad.</li>'
            . '<li><strong>Diseño retro:</strong> Estética vintage animada con acabado de colección.</li>'
            . '<li><strong>Doble propósito:</strong> Uso personal o producto estrella para reventa.</li>'
            . '</ul>'
            . '<p>Conseguila por unidad o por <strong>compra mayorista</strong>. Accesorio indispensable para <strong>tabaquerías</strong>, <strong>smoke shops</strong> y revendedores en Argentina.</p>';

        $product5 = Product::firstOrCreate(
            ['title' => 'Bandeja metálica 4US – Edición diseño animado (variante 5)'],
            [
                'description' => $description5,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product5->prices()->doesntExist()) {
            $product5->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 7000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 5 unidades',
                    'min_quantity' => 5,
                    'price'        => 5000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product5->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product5->media()->createMany([
                [
                    'file_path'  => $basePath . '/Bandeja-5-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-5-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Bandejas-general.JPG',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product5->categories()->syncWithoutDetaching([$category5->id]);
    #endregion

    #region Producto 6: Picador 2 Piezas - Edicion "4US" Green
        // ── 1. Category ────────────────────────────────────────────────────
        $category6 = Category::firstOrCreate(
            ['slug' => Str::slug('Picador')],
            ['name' => 'Picador'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description6 = '<p>Lleva tu experiencia al siguiente nivel con este picador de alta resistencia. Disenado para quienes buscan practicidad sin sacrificar estilo, este modelo combina un triturado eficiente con un diseno ergonomico y liviano, ideal para llevar con vos a todos lados.</p>'
            . '<p><strong>Caracteristicas Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Material de Alta Durabilidad:</strong> Fabricado en polimero reforzado de alto impacto, resistente a caidas y al uso intensivo.</li>'
            . '<li><strong>Dientes Estilo "Tiburon":</strong> Sus dientes internos estan estrategicamente posicionados para un triturado uniforme y sin esfuerzo.</li>'
            . '<li><strong>Diseno Compacto:</strong> Formato de dos piezas con cierre preciso, perfecto para el bolsillo o el kit de fumador.</li>'
            . '<li><strong>Estetica Exclusiva:</strong> Color verde moteado con grabado superior en blanco que incluye la frase "Ek kash kheeche, sari duniya peeche".</li>'
            . '</ul>'
            . '<p><strong>Especificaciones Tecnicas:</strong></p>'
            . '<ul>'
            . '<li><strong>Tipo:</strong> Grinder de 2 partes.</li>'
            . '<li><strong>Color:</strong> Verde con terminacion mate.</li>'
            . '<li><strong>Sistema de triturado:</strong> Dientes fijos integrados.</li>'
            . '</ul>';

        $product6 = Product::firstOrCreate(
            ['title' => 'Picador 2 Piezas - Edicion "4US" Green'],
            [
                'description' => $description6,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product6->prices()->doesntExist()) {
            $product6->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 6000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 12 unidades',
                    'min_quantity' => 12,
                    'price'        => 50000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product6->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product6->media()->createMany([
                [
                    'file_path'  => $basePath . '/Picador-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Picador-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Picador-general.jpeg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product6->categories()->syncWithoutDetaching([$category6->id]);
    #endregion

    #region Producto 7: Picador 2 Piezas - Edicion "4US" Red
        // ── 1. Category ────────────────────────────────────────────────────
        $category7 = Category::firstOrCreate(
            ['slug' => Str::slug('Picador')],
            ['name' => 'Picador'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description7 = '<p>Lleva tu experiencia al siguiente nivel con este picador de alta resistencia. Disenado para quienes buscan practicidad sin sacrificar estilo, este modelo combina un triturado eficiente con un diseno ergonomico y liviano, ideal para llevar con vos a todos lados.</p>'
            . '<p><strong>Caracteristicas Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Material de Alta Durabilidad:</strong> Fabricado en polimero reforzado de alto impacto, resistente a caidas y al uso intensivo.</li>'
            . '<li><strong>Dientes Estilo "Tiburon":</strong> Sus dientes internos estan estrategicamente posicionados para un triturado uniforme y sin esfuerzo.</li>'
            . '<li><strong>Diseno Compacto:</strong> Formato de dos piezas con cierre preciso, perfecto para el bolsillo o el kit de fumador.</li>'
            . '<li><strong>Estetica Exclusiva:</strong> Color rojo con grabado superior en blanco que incluye la frase "Ek kash kheeche, sari duniya peeche".</li>'
            . '</ul>'
            . '<p><strong>Especificaciones Tecnicas:</strong></p>'
            . '<ul>'
            . '<li><strong>Tipo:</strong> Grinder de 2 partes.</li>'
            . '<li><strong>Color:</strong> Rojo con terminacion mate.</li>'
            . '<li><strong>Sistema de triturado:</strong> Dientes fijos integrados.</li>'
            . '</ul>';

        $product7 = Product::firstOrCreate(
            ['title' => 'Picador 2 Piezas - Edicion "4US" Red'],
            [
                'description' => $description7,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product7->prices()->doesntExist()) {
            $product7->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 6000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 12 unidades',
                    'min_quantity' => 12,
                    'price'        => 50000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product7->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product7->media()->createMany([
                [
                    'file_path'  => $basePath . '/Picador-2-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Picador-2-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Picador-2-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
                [
                    'file_path'  => $basePath . '/Picador-general.jpeg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 4,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product7->categories()->syncWithoutDetaching([$category7->id]);
    #endregion

    #region Producto 8: Frasco Triturador Todo en Uno con Lupa y Luz LED
        // ── 1. Category ────────────────────────────────────────────────────
        $category8 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description8 = '<p>El <strong>Frasco Triturador Todo en Uno</strong> es un <strong>accesorio multifunción</strong> diseñado para quienes buscan organizar, triturar y preparar su contenido en un solo dispositivo. Su diseño compacto integra múltiples funciones que facilitan el uso diario y mantienen todo en un mismo lugar.</p>'
            . '<p>En la parte inferior incluye un <strong>picador (grinder) desmontable</strong>, ideal para triturar de manera eficiente. La sección central cuenta con un <em>visor transparente</em>, que permite ver fácilmente el contenido almacenado sin necesidad de abrir el frasco. En la parte superior incorpora una <strong>lupa con luz LED recargable</strong>, perfecta para observar el material con mayor detalle.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Picador desmontable:</strong> Grinder integrado para un triturado eficiente.</li>'
            . '<li><strong>Frasco contenedor:</strong> Visor transparente para ver el contenido sin abrir.</li>'
            . '<li><strong>Lupa integrada:</strong> Ubicada en la tapa para inspección detallada.</li>'
            . '<li><strong>Luz LED recargable:</strong> Iluminación incorporada para mejor visibilidad.</li>'
            . '<li><strong>Diseño compacto:</strong> Sistema multifunción portátil y moderno.</li>'
            . '</ul>'
            . '<p>Disponible por unidad o <strong>por mayor</strong>, ideal para <strong>tabaquerías</strong>, <strong>grow shops</strong> y revendedores que buscan sumar un accesorio práctico e innovador a su catálogo.</p>';

        $product8 = Product::firstOrCreate(
            ['title' => 'Frasco Triturador Todo en Uno con Lupa y Luz LED'],
            [
                'description' => $description8,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product8->prices()->doesntExist()) {
            $product8->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 60000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 3 unidades',
                    'min_quantity' => 3,
                    'price'        => 50000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product8->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product8->media()->createMany([
                [
                    'file_path'  => $basePath . '/Contenedor-premium-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Contenedor-premium-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Contenedor-premium-1-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
                [
                    'file_path'  => $basePath . '/Contenedor-premium-1-4.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 4,
                ],
                [
                    'file_path'  => $basePath . '/Contenedor-premium-1-5.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 5,
                ],
                [
                    'file_path'  => $basePath . '/Contenedor-premium-1-6.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 6,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product8->categories()->syncWithoutDetaching([$category8->id]);
    #endregion

    #region Producto 9: Picador de Hierba 4US – Aleación de Zinc 4 Piezas (50 mm)
        // ── 1. Category ────────────────────────────────────────────────────
        $category9 = Category::firstOrCreate(
            ['slug' => Str::slug('Picador')],
            ['name' => 'Picador'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description9 = '<p>Potenciá tu experiencia con el <strong>picador de hierba 4US</strong>, diseñado para ofrecer un <strong>triturado preciso, uniforme y sin esfuerzo</strong>. Fabricado en <strong>aleación de zinc resistente</strong>, este grinder combina durabilidad, diseño y funcionalidad en un formato compacto ideal para el uso diario.</p>'
            . '<p>Su sistema de <strong>4 piezas</strong> incluye dientes de corte tipo diamante que garantizan una molienda eficiente, mientras que el <em>filtro de malla fina</em> permite separar las partículas más finas para un aprovechamiento completo del material. Además, su <strong>tapa magnética</strong> asegura un cierre firme y seguro durante el uso o transporte.</p>'
            . '<p>Disponible en <em>diseños llamativos y psicodélicos</em>, este picador no solo es funcional sino también un accesorio con estilo dentro de cualquier colección de <strong>tabaquería</strong>.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Material:</strong> Aleación de zinc resistente y duradera.</li>'
            . '<li><strong>Sistema de 4 piezas:</strong> Con compartimento de almacenamiento integrado.</li>'
            . '<li><strong>Dientes tipo diamante:</strong> Triturado uniforme y eficiente.</li>'
            . '<li><strong>Filtro de malla fina:</strong> Separación precisa de partículas.</li>'
            . '<li><strong>Tapa magnética:</strong> Cierre seguro para transporte sin derrames.</li>'
            . '<li><strong>Raspador incluido:</strong> Para recolectar residuos fácilmente.</li>'
            . '<li><strong>Diámetro:</strong> 50 mm, tamaño compacto y portátil.</li>'
            . '</ul>'
            . '<p>Perfecto para quienes buscan <strong>calidad y diseño</strong> en un solo accesorio. Un producto imprescindible en cualquier <strong>smoke shop</strong> o <strong>tabaquería</strong>.</p>'
            . '<p>Disponible para <strong>venta por menor y por mayor</strong>.</p>';

        $product9 = Product::firstOrCreate(
            ['title' => 'Picador de Hierba 4US – Aleación de Zinc 4 Piezas (50 mm)'],
            [
                'description' => $description9,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product9->prices()->doesntExist()) {
            $product9->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 25000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 12 unidades',
                    'min_quantity' => 12,
                    'price'        => 16500.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product9->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product9->media()->createMany([
                [
                    'file_path'  => $basePath . '/Picador-metal-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Picador-metal-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Picador-metal-1-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
                [
                    'file_path'  => $basePath . '/Picador-metal-general.jpeg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 4,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product9->categories()->syncWithoutDetaching([$category9->id]);
    #endregion

    #region Producto 10: Picador de Hierba 4US – Aleación de Zinc 4 Piezas (50 mm) - Variante 2
        // ── 1. Category ────────────────────────────────────────────────────
        $category10 = Category::firstOrCreate(
            ['slug' => Str::slug('Picador')],
            ['name' => 'Picador'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description10 = '<p>Elevá tu experiencia con el <strong>picador de hierba 4US</strong> en su segunda variante de diseño. Fabricado en <strong>aleación de zinc de alta resistencia</strong>, este grinder ofrece un <strong>triturado preciso y uniforme</strong> en un formato compacto pensado para el uso intensivo.</p>'
            . '<p>Con su sistema de <strong>4 piezas</strong>, incluye dientes de corte tipo diamante para una molienda eficiente y un <em>filtro de malla fina</em> que separa las partículas más pequeñas. La <strong>tapa magnética</strong> garantiza un cierre firme y seguro, ideal para transportar sin preocupaciones.</p>'
            . '<p>Esta variante presenta un <em>diseño exclusivo con gráfica psicodélica diferenciada</em>, destacando como accesorio de estilo en cualquier <strong>colección de tabaquería</strong>.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Material:</strong> Aleación de zinc premium, resistente al desgaste.</li>'
            . '<li><strong>4 piezas:</strong> Sistema completo con compartimento de almacenamiento.</li>'
            . '<li><strong>Corte tipo diamante:</strong> Molienda uniforme en cada uso.</li>'
            . '<li><strong>Malla fina:</strong> Filtrado óptimo de partículas pequeñas.</li>'
            . '<li><strong>Cierre magnético:</strong> Seguridad durante el transporte.</li>'
            . '<li><strong>Raspador incluido:</strong> Recolección fácil de residuos.</li>'
            . '<li><strong>Diámetro:</strong> 50 mm, portátil y práctico.</li>'
            . '</ul>'
            . '<p>Ideal para uso personal o como producto estrella en tu <strong>tabaquería</strong> o <strong>grow shop</strong>.</p>'
            . '<p>Disponible para <strong>compra por menor y mayorista</strong>.</p>';

        $product10 = Product::firstOrCreate(
            ['title' => 'Picador de Hierba 4US – Aleación de Zinc 4 Piezas (50 mm) (Variante 2)'],
            [
                'description' => $description10,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product10->prices()->doesntExist()) {
            $product10->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 25000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 12 unidades',
                    'min_quantity' => 12,
                    'price'        => 16500.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product10->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product10->media()->createMany([
                [
                    'file_path'  => $basePath . '/Picador-metal-2-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Picador-metal-2-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Picador-metal-2-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
                [
                    'file_path'  => $basePath . '/Picador-metal-general.jpeg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 4,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product10->categories()->syncWithoutDetaching([$category10->id]);
    #endregion

    #region Producto 11: 4US Brown Rolling Paper – Papel para armar
        // ── 1. Category ────────────────────────────────────────────────────
        $category11 = Category::firstOrCreate(
            ['slug' => Str::slug('Rolling Paper')],
            ['name' => 'Rolling Paper'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description11 = '<p>Los <strong>4US Brown Rolling Paper</strong> son <strong>papeles para armar de alta calidad</strong>, fabricados con <em>pulpa de madera 100% natural</em> y diseñados para ofrecer una <strong>combustión pareja</strong> y un armado cómodo.</p>'
            . '<p>Su <strong>papel brown sin blanquear</strong> mantiene un estilo más natural y ligero, permitiendo disfrutar una experiencia de fumado más pura y con mejor tiraje. Además, cuentan con <strong>goma arábiga natural</strong>, lo que asegura un pegado firme y sencillo al momento de armar.</p>'
            . '<p>Cada <strong>display incluye 22 packs</strong>, lo que lo convierte en una excelente opción para kioscos, <strong>tabaquerías</strong> y revendedores que buscan un producto confiable y de buena rotación.</p>'
            . '<p>El diseño del packaging, con una <em>estética colorida e inspirada en la naturaleza</em>, refleja el enfoque natural del producto y lo hace destacar en cualquier mostrador.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Papel brown natural:</strong> Sin blanquear, para una experiencia más pura.</li>'
            . '<li><strong>Goma arábiga natural:</strong> Pegado firme y sencillo.</li>'
            . '<li><strong>100% pulpa de madera:</strong> Material orgánico de primera calidad.</li>'
            . '<li><strong>Combustión uniforme:</strong> Quemado parejo sin interrupciones.</li>'
            . '<li><strong>Display de 22 packs:</strong> Formato ideal para reventa.</li>'
            . '</ul>'
            . '<p>Disponibles por unidad o <strong>por mayor</strong>, ideales para consumidores habituales y comercios que buscan sumar un <strong>rolling paper</strong> de calidad a su catálogo de <strong>tabaquería</strong>.</p>';

        $product11 = Product::firstOrCreate(
            ['title' => '4US Brown Rolling Paper – Papel para armar'],
            [
                'description' => $description11,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product11->prices()->doesntExist()) {
            $product11->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 5000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 22 unidades',
                    'min_quantity' => 22,
                    'price'        => 2700.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product11->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product11->media()->createMany([
                [
                    'file_path'  => $basePath . '/papel-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/papel-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/papel-1-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
                [
                    'file_path'  => $basePath . '/papel-1-4.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 4,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product11->categories()->syncWithoutDetaching([$category11->id]);
    #endregion

    #region Producto 12: Papel para armar 4US Brown – Pack x50 hojas
        // ── 1. Category ────────────────────────────────────────────────────
        $category12 = Category::firstOrCreate(
            ['slug' => Str::slug('Rolling Paper')],
            ['name' => 'Rolling Paper'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description12 = '<p>Descubrí una experiencia diferente al armar con los <strong>papeles 4US Brown</strong>. Diseñados para quienes buscan <strong>calidad y estilo</strong>, estos papeles están fabricados con <em>material orgánico sin blanquear</em>, ofreciendo una <strong>combustión más natural, lenta y uniforme</strong>.</p>'
            . '<p>Su formato práctico y liviano los convierte en el compañero ideal para llevar a todos lados, mientras que su <em>diseño psicodélico y vibrante</em> refleja una identidad única, pensada para quienes viven cada momento al máximo.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Papel orgánico:</strong> Sin blanquear, para un fumado más natural.</li>'
            . '<li><strong>Combustión lenta:</strong> Quemado parejo y prolongado.</li>'
            . '<li><strong>Sabor puro:</strong> Sin interferencias químicas en el sabor.</li>'
            . '<li><strong>Pack de 50 hojas:</strong> Contenido generoso para uso prolongado.</li>'
            . '<li><strong>Ideal para reventa:</strong> Producto de alta rotación en tabaquerías.</li>'
            . '</ul>'
            . '<p>Disponibles por unidad o en <strong>compras mayoristas</strong>. Stock permanente para abastecer tu negocio de <strong>tabaquería</strong> o sumar a tu colección personal de <strong>rolling papers</strong>.</p>';

        $product12 = Product::firstOrCreate(
            ['title' => 'Papel para armar 4US Brown – Pack x50 hojas'],
            [
                'description' => $description12,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product12->prices()->doesntExist()) {
            $product12->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 3000.00,
                    'sort_order'   => 1,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product12->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product12->media()->createMany([
                [
                    'file_path'  => $basePath . '/papel-2-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/papel-2-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product12->categories()->syncWithoutDetaching([$category12->id]);

    #endregion

    #region Producto 13: 4US Premium Cone – Conos prearmados
        // ── 1. Category ────────────────────────────────────────────────────
        $category13 = Category::firstOrCreate(
            ['slug' => Str::slug('Rolling Paper')],
            ['name' => 'Rolling Paper'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description13 = '<p>Los <strong>4US Premium Cone</strong> son <strong>conos prearmados de alta calidad</strong> diseñados para quienes buscan practicidad y una experiencia de fumado uniforme. Fabricados con <em>papel ultra fino de origen natural</em>, permiten una <strong>combustión pareja</strong> que respeta el sabor del contenido.</p>'
            . '<p>Cada cono viene <strong>perfectamente armado con filtro incorporado</strong>, listo para rellenar sin necesidad de armar manualmente. Esto los convierte en una opción ideal tanto para usuarios habituales como para quienes prefieren una preparación rápida y cómoda.</p>'
            . '<p>El pack incluye <strong>55 conos prearmados</strong>, elaborados con <em>papel orgánico blanqueado</em>, garantizando un producto liviano, resistente y de excelente tiraje.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Papel ultra fino:</strong> Con goma arábiga natural para sellado perfecto.</li>'
            . '<li><strong>Combustión uniforme:</strong> Quemado parejo de principio a fin.</li>'
            . '<li><strong>Cono prearmado:</strong> Con filtro incorporado, listo para usar.</li>'
            . '<li><strong>Papel 100% natural:</strong> Material orgánico de primera calidad.</li>'
            . '<li><strong>Pack de 55 unidades:</strong> Contenido ideal para uso prolongado o reventa.</li>'
            . '</ul>'
            . '<p>Disponibles por unidad o <strong>por mayor</strong>, ideales para kioscos, <strong>tabaquerías</strong> y revendedores que buscan ofrecer <strong>conos prearmados</strong> de gran rotación.</p>';

        $product13 = Product::firstOrCreate(
            ['title' => '4US Premium Cone – Conos prearmados'],
            [
                'description' => $description13,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product13->prices()->doesntExist()) {
            $product13->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 1000.00,
                    'sort_order'   => 1,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product13->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product13->media()->createMany([
                [
                    'file_path'  => $basePath . '/papel-3-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/papel-3-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product13->categories()->syncWithoutDetaching([$category13->id]);
    #endregion

    #region Producto 14: Contenedor hermético “Keep It Fresh”
        // ── 1. Category ────────────────────────────────────────────────────
        $category14 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description14 = '<p>Mantené tu material siempre en perfectas condiciones con este <strong>contenedor hermético</strong> diseñado para conservar <strong>aroma, frescura y calidad</strong>. Su sistema de <em>cierre a presión con válvula</em> permite liberar el aire interno para lograr un sellado más efectivo, ayudando a preservar el contenido por más tiempo.</p>'
            . '<p>Fabricado con <strong>materiales resistentes y livianos</strong>, es ideal para transportar de forma segura y discreta. Su diseño exterior con <em>arte psicodélico</em> le da un estilo único que destaca entre los <strong>accesorios de tabaquería</strong>.</p>'
            . '<p>Perfecto para uso personal o para quienes buscan organizar su kit con accesorios funcionales y con personalidad.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Cierre hermético:</strong> Sistema con botón de presión para sellado total.</li>'
            . '<li><strong>Conservación óptima:</strong> Mantiene aroma y frescura por más tiempo.</li>'
            . '<li><strong>Material resistente:</strong> Construcción liviana y duradera.</li>'
            . '<li><strong>Diseño artístico:</strong> Estética psicodélica única y llamativa.</li>'
            . '<li><strong>Compacto y portátil:</strong> Fácil de transportar a cualquier lugar.</li>'
            . '</ul>'
            . '<p>Disponible por unidad y también para <strong>compra mayorista</strong>. Accesorio ideal para <strong>tabaquerías</strong> y <strong>grow shops</strong>.</p>';

        $product14 = Product::firstOrCreate(
            ['title' => 'Contenedor hermético “Keep It Fresh”'],
            [
                'description' => $description14,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product14->prices()->doesntExist()) {
            $product14->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 12000.00,
                    'sort_order'   => 1,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product14->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product14->media()->createMany([
                [
                    'file_path'  => $basePath . '/Contenedor-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Contenedor-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Contenedor-1-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product14->categories()->syncWithoutDetaching([$category14->id]);
    #endregion

    #region Producto 15: Picador metálico 3 partes 4US
        // ── 1. Category ────────────────────────────────────────────────────
        $category15 = Category::firstOrCreate(
            ['slug' => Str::slug('Picador')],
            ['name' => 'Picador'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description15 = '<p><strong>Picador metálico 4US de 3 partes</strong> – De alta calidad, fabricado en <strong>metal resistente</strong>, ideal para lograr una <strong>molienda uniforme y sin esfuerzo</strong>. Su diseño de 3 partes permite triturar el material de forma eficiente, mientras que el compartimento intermedio facilita la recolección sin desperdicios.</p>'
            . '<p>Cuenta con <strong>dientes afilados tipo diamante</strong> que garantizan un corte preciso, y una <em>tapa con cierre magnético</em> que asegura firmeza durante el uso. Incluye <strong>tamiz fino</strong> para filtrar partículas más pequeñas, optimizando cada uso.</p>'
            . '<p>Compacto, duradero y fácil de transportar, es una herramienta esencial tanto para uso personal como para reventa en <strong>tabaquerías</strong>.</p>'
            . '<p><strong>Especificaciones Técnicas:</strong></p>'
            . '<ul>'
            . '<li><strong>Material:</strong> Metal de alta resistencia y durabilidad.</li>'
            . '<li><strong>Sistema:</strong> 3 partes con filtro integrado.</li>'
            . '<li><strong>Cierre magnético:</strong> Seguridad y firmeza en cada uso.</li>'
            . '<li><strong>Molienda uniforme:</strong> Dientes tipo diamante para corte preciso.</li>'
            . '</ul>'
            . '<p>Disponible por unidad y <strong>por mayor</strong>. Producto ideal para <strong>smoke shops</strong>, <strong>tabaquerías</strong> y revendedores.</p>';

        $product15 = Product::firstOrCreate(
            ['title' => 'Picador metálico 3 partes 4US'],
            [
                'description' => $description15,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product15->prices()->doesntExist()) {
            $product15->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 55000.00,
                    'sort_order'   => 1,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product15->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product15->media()->createMany([
                [
                    'file_path'  => $basePath . '/Picador-metal-premium-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Picador-metal-premium-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Picador-metal-premium-1-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product15->categories()->syncWithoutDetaching([$category15->id]);
    #endregion

    #region Producto 16: Bandeja Imantada para armar
        // ── 1. Category ────────────────────────────────────────────────────
        $category16 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description16 = '<p>Práctica, funcional y con un diseño llamativo, esta <strong>bandeja imantada para armar</strong> es el accesorio ideal para quienes buscan comodidad y orden al momento de preparar. Su <strong>base imantada</strong> se adhiere a superficies metálicas, evitando movimientos y derrames, brindando mayor estabilidad en cada uso.</p>'
            . '<p>Gracias a sus <strong>bordes elevados</strong>, permite trabajar sin desperdiciar material, manteniendo todo en un solo lugar. Su tamaño compacto la hace fácil de transportar, perfecta tanto para uso diario como para llevar a cualquier lado.</p>'
            . '<p>El <em>diseño exclusivo con arte psicodélico en tonos cálidos</em> le da un estilo único que destaca dentro de cualquier colección de <strong>accesorios de tabaquería</strong>.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Base imantada:</strong> Antideslizante para máxima estabilidad.</li>'
            . '<li><strong>Bordes elevados:</strong> Mayor control y retención del material.</li>'
            . '<li><strong>Tamaño práctico:</strong> Compacta y fácil de transportar.</li>'
            . '<li><strong>Diseño original:</strong> Arte psicodélico con paleta de colores cálidos.</li>'
            . '</ul>'
            . '<p>Ideal para picar, armar y mantener todo organizado. Disponible por unidad y <strong>por mayor</strong> para <strong>tabaquerías</strong> y revendedores.</p>';

        $product16 = Product::firstOrCreate(
            ['title' => 'Bandeja Imantada para armar'],
            [
                'description' => $description16,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product16->prices()->doesntExist()) {
            $product16->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 25000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 3 unidades',
                    'min_quantity' => 3,
                    'price'        => 20000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product16->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product16->media()->createMany([
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-1-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-1-4.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 4,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-1-5.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 5,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product16->categories()->syncWithoutDetaching([$category16->id]);
    #endregion

    #region Producto 17: Bandeja Imantada para armar Variante 2
        // ── 1. Category ────────────────────────────────────────────────────
        $category17 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description17 = '<p>Organizá tu espacio de armado con esta <strong>bandeja imantada 4US</strong>, diseñada para combinar <strong>practicidad y estilo</strong>. Su <strong>base magnética</strong> se fija a superficies metálicas, garantizando estabilidad total y evitando derrames mientras preparás.</p>'
            . '<p>Los <strong>bordes elevados</strong> mantienen el material contenido en la superficie de trabajo, facilitando un armado limpio y sin desperdicios. Su formato compacto la convierte en el accesorio perfecto para llevar a cualquier lugar.</p>'
            . '<p>Esta variante presenta un <em>diseño con gráfica urbana en tonos fríos</em>, aportando una estética moderna y diferenciada dentro de la colección de <strong>accesorios de tabaquería 4US</strong>.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Base magnética:</strong> Fijación segura sobre superficies metálicas.</li>'
            . '<li><strong>Bordes contenedores:</strong> Evitan pérdidas de material al armar.</li>'
            . '<li><strong>Portátil:</strong> Tamaño compacto ideal para transportar.</li>'
            . '<li><strong>Diseño urbano:</strong> Gráfica exclusiva en tonos fríos y modernos.</li>'
            . '</ul>'
            . '<p>Ideal para picar, armar y organizar. Disponible por unidad y en <strong>venta mayorista</strong> para <strong>tabaquerías</strong>, <strong>smoke shops</strong> y revendedores.</p>';

        $product17 = Product::firstOrCreate(
            ['title' => 'Bandeja Imantada para armar Variante 2'],
            [
                'description' => $description17,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product17->prices()->doesntExist()) {
            $product17->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 25000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 3 unidades',
                    'min_quantity' => 3,
                    'price'        => 20000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product17->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product17->media()->createMany([
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-2-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-2-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-2-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-2-4.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 4,
                ],
                [
                    'file_path'  => $basePath . '/Bandeja-imantada-2-5.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 5,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product17->categories()->syncWithoutDetaching([$category17->id]);
    #endregion

    #region Producto 18: Cenicero de vidrio 4US – Diseño Premium
        // ── 1. Category ────────────────────────────────────────────────────
        $category18 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description18 = '<p><strong>Cenicero de vidrio 4US</strong> resistente con terminación de alta calidad, ideal para acompañar cualquier espacio con <strong>estilo y funcionalidad</strong>. Su diseño sólido garantiza estabilidad, mientras que sus ranuras permiten apoyar cómodamente cigarrillos o armados.</p>'
            . '<p>Cuenta con una <strong>base amplia</strong> que facilita la limpieza y evita la acumulación de residuos fuera del área de uso. Este modelo presenta un <em>diseño psicodélico multicolor</em> con gráficos llamativos que le dan un toque único y moderno.</p>'
            . '<p>Perfecto tanto para uso personal como para sumar a la oferta de cualquier <strong>tabaquería</strong>.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Material:</strong> Vidrio resistente de alta calidad.</li>'
            . '<li><strong>Ranuras funcionales:</strong> Apoyo seguro para cigarrillos y armados.</li>'
            . '<li><strong>Fácil de limpiar:</strong> Superficie lisa sin porosidades.</li>'
            . '<li><strong>Diseño psicodélico:</strong> Arte multicolor vibrante y original.</li>'
            . '<li><strong>Base estable:</strong> Construcción sólida y duradera.</li>'
            . '</ul>'
            . '<p>Disponible por unidad y <strong>por mayor</strong>. Accesorio ideal para <strong>smoke shops</strong> y <strong>tabaquerías</strong>.</p>';

        $product18 = Product::firstOrCreate(
            ['title' => 'Cenicero de vidrio 4US – Diseño Premium'],
            [
                'description' => $description18,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product18->prices()->doesntExist()) {
            $product18->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 10000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 2 unidades',
                    'min_quantity' => 2,
                    'price'        => 7000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product18->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product18->media()->createMany([
                [
                    'file_path'  => $basePath . '/Cenicero-4-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Cenicero-4-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product18->categories()->syncWithoutDetaching([$category18->id]);
    #endregion

    #region Producto 19: Cenicero de vidrio 4US – Diseño Premium (Variante 2)
        // ── 1. Category ────────────────────────────────────────────────────
        $category19 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description19 = '<p><strong>Cenicero de vidrio 4US</strong> con acabado premium, diseñado para quienes valoran la <strong>calidad y el diseño</strong> en cada detalle. Su estructura de <strong>vidrio resistente</strong> ofrece durabilidad y estabilidad en cualquier superficie.</p>'
            . '<p>Las ranuras integradas permiten apoyar cigarrillos o armados de forma segura, mientras que su <strong>base amplia</strong> facilita el mantenimiento y la limpieza diaria. Esta variante presenta una <em>gráfica artística con tonos vibrantes</em>, ideal para darle personalidad a tu espacio.</p>'
            . '<p>Un accesorio funcional que eleva la estética de cualquier rincón fumador.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Vidrio premium:</strong> Resistente a impactos y al uso intensivo.</li>'
            . '<li><strong>Ranuras de apoyo:</strong> Soporte seguro para cigarrillos y armados.</li>'
            . '<li><strong>Limpieza sencilla:</strong> Superficie que no retiene residuos.</li>'
            . '<li><strong>Arte vibrante:</strong> Gráfica artística con colores llamativos.</li>'
            . '<li><strong>Estabilidad total:</strong> Base amplia y peso adecuado.</li>'
            . '</ul>'
            . '<p>Disponible por unidad y en <strong>compra mayorista</strong> para <strong>tabaquerías</strong> y revendedores.</p>';

        $product19 = Product::firstOrCreate(
            ['title' => 'Cenicero de vidrio 4US – Diseño Premium (Variante 2)'],
            [
                'description' => $description19,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product19->prices()->doesntExist()) {
            $product19->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 10000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 2 unidades',
                    'min_quantity' => 2,
                    'price'        => 7000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product19->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product19->media()->createMany([
                [
                    'file_path'  => $basePath . '/Cenicero-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product19->categories()->syncWithoutDetaching([$category19->id]);
    #endregion

    #region Producto 20: Cenicero de vidrio 4US – Diseño Premium (Variante 3)
        // ── 1. Category ────────────────────────────────────────────────────
        $category20 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description20 = '<p><strong>Cenicero de vidrio 4US</strong> con terminación de primera calidad, pensado para complementar cualquier espacio con un <strong>toque artístico y urbano</strong>. Fabricado en <strong>vidrio grueso y resistente</strong>, garantiza una larga vida útil incluso con uso diario intenso.</p>'
            . '<p>Su diseño funcional incluye ranuras para apoyo de cigarrillos y una base estable que evita vuelcos. Esta variante destaca por su <em>estampado con arte urbano</em>, una opción moderna y con carácter para los amantes del estilo callejero.</p>'
            . '<p>Ideal como accesorio personal o como producto destacado en la vidriera de tu comercio.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Vidrio grueso:</strong> Máxima resistencia para uso intensivo.</li>'
            . '<li><strong>Ranuras integradas:</strong> Apoyo cómodo y seguro para cigarrillos.</li>'
            . '<li><strong>Fácil mantenimiento:</strong> Limpieza rápida sin complicaciones.</li>'
            . '<li><strong>Arte urbano:</strong> Estampado con estética callejera y moderna.</li>'
            . '<li><strong>Diseño estable:</strong> Base firme que evita accidentes.</li>'
            . '</ul>'
            . '<p>Disponible por unidad y <strong>por mayor</strong>. Sumá estilo al stock de tu <strong>tabaquería</strong> o <strong>smoke shop</strong>.</p>';

        $product20 = Product::firstOrCreate(
            ['title' => 'Cenicero de vidrio 4US – Diseño Premium (Variante 3)'],
            [
                'description' => $description20,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product20->prices()->doesntExist()) {
            $product20->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 10000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 2 unidades',
                    'min_quantity' => 2,
                    'price'        => 7000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product20->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product20->media()->createMany([
                [
                    'file_path'  => $basePath . '/Cenicero-2-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Cenicero-2-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product20->categories()->syncWithoutDetaching([$category20->id]);
    #endregion

    #region Producto 21: Cenicero de vidrio 4US – Diseño Premium (Variante 4)
        // ── 1. Category ────────────────────────────────────────────────────
        $category21 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description21 = '<p><strong>Cenicero de vidrio 4US</strong> con diseño exclusivo y <strong>acabado de alta calidad</strong>. Su construcción en <strong>vidrio resistente</strong> asegura durabilidad, mientras que su estética cuidada lo convierte en un accesorio que combina <strong>funcionalidad y personalidad</strong>.</p>'
            . '<p>Equipado con ranuras de apoyo para cigarrillos y armados, y una base amplia que brinda estabilidad total. Esta variante presenta un <em>diseño moderno con colores contrastantes</em>, perfecto para quienes buscan un cenicero con identidad propia.</p>'
            . '<p>Un producto que no puede faltar en ningún rincón fumador ni en la vidriera de tu negocio.</p>'
            . '<p><strong>Características Principales:</strong></p>'
            . '<ul>'
            . '<li><strong>Vidrio de calidad:</strong> Resistente, duradero y con acabado premium.</li>'
            . '<li><strong>Apoyo seguro:</strong> Ranuras diseñadas para cigarrillos y armados.</li>'
            . '<li><strong>Mantenimiento cero:</strong> Superficie fácil de limpiar en segundos.</li>'
            . '<li><strong>Colores contrastantes:</strong> Diseño moderno de alto impacto visual.</li>'
            . '<li><strong>Base firme:</strong> Estabilidad garantizada en cualquier superficie.</li>'
            . '</ul>'
            . '<p>Disponible por unidad y en <strong>venta mayorista</strong>. Producto de alta demanda para <strong>tabaquerías</strong>, <strong>grow shops</strong> y revendedores en Argentina.</p>';

        $product21 = Product::firstOrCreate(
            ['title' => 'Cenicero de vidrio 4US – Diseño Premium (Variante 4)'],
            [
                'description' => $description21,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product21->prices()->doesntExist()) {
            $product21->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 10000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 2 unidades',
                    'min_quantity' => 2,
                    'price'        => 7000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product21->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product21->media()->createMany([
                [
                    'file_path'  => $basePath . '/Cenicero-3-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/Cenicero-3-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product21->categories()->syncWithoutDetaching([$category21->id]);
    #endregion

    #region Producto 22: Bandeja de Enrolado con Tapa Imantada - Edición 4US
        // ── 1. Category ────────────────────────────────────────────────────
        $category22 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description22 = '<p>Mantené tu espacio de armado impecable y transportá tus accesorios con total seguridad. Esta bandeja metálica de alta calidad no es solo una superficie de trabajo; su tapa imantada de ajuste perfecto permite cerrar el kit y llevarlo en la mochila o bolso sin riesgo de derrames.</p>'
            . '<p><strong>¿Por qué elegir estas bandejas?</strong></p>'
            . '<ul>'
            . '<li><strong>Diseño Antidesperdicio:</strong> Bordes redondeados y elevados para que no se escape nada mientras armás.</li>'
            . '<li><strong>Cierre Magnético Potente:</strong> La tapa se adhiere firmemente a la base metálica, protegiendo el contenido del polvo y la humedad.</li>'
            . '<li><strong>Material Premium:</strong> Construcción en metal resistente con acabado brillante, fácil de limpiar y de larga durabilidad.</li>'
            . '<li><strong>Arte Exclusivo:</strong> Disponible en dos diseños de alto impacto visual (Alien Trip y Purple Flower).</li>'
            . '</ul>'
            . '<p><strong>Especificaciones Técnicas:</strong></p>'
            . '<ul>'
            . '<li><strong>Material:</strong> Metal ligero reforzado.</li>'
            . '<li><strong>Incluye:</strong> Bandeja base + Tapa imantada con diseño a juego.</li>'
            . '<li><strong>Tamaño:</strong> Grande (ideal para tener todos los accesorios en un solo lugar).</li>'
            . '</ul>'
            . '<p><strong>Venta Mayorista y Minorista</strong></p>'
            . '<p>Ideales para Grow Shops y Tabaquerías que buscan productos con alta rotación y excelente margen. Consultá por precios especiales para compras por mayor y renová el stock de tu negocio con lo último en parafernalia.</p>';

        $product22 = Product::firstOrCreate(
            ['title' => 'Bandeja de Enrolado con Tapa Imantada - Edición 4US'],
            [
                'description' => $description22,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product22->prices()->doesntExist()) {
            $product22->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 50000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 2 unidades',
                    'min_quantity' => 2,
                    'price'        => 40000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product22->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product22->media()->createMany([
                [
                    'file_path'  => $basePath . '/bandeja-imantada-grande-1-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/bandeja-imantada-grande-1-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/bandeja-imantada-grande-1-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product22->categories()->syncWithoutDetaching([$category22->id]);
    #endregion

    #region Producto 23: Bandeja de Enrolado con Tapa Imantada - Edición 4US (Variante 2)
        // ── 1. Category ────────────────────────────────────────────────────
        $category23 = Category::firstOrCreate(
            ['slug' => Str::slug('Accesorios')],
            ['name' => 'Accesorios'],
        );

        // ── 2. Product ─────────────────────────────────────────────────────
        $description23 = '<p>Mantené tu espacio de armado impecable y transportá tus accesorios con total seguridad. Esta bandeja metálica de alta calidad no es solo una superficie de trabajo; su tapa imantada de ajuste perfecto permite cerrar el kit y llevarlo en la mochila o bolso sin riesgo de derrames.</p>'
            . '<p><strong>¿Por qué elegir estas bandejas?</strong></p>'
            . '<ul>'
            . '<li><strong>Diseño Antidesperdicio:</strong> Bordes redondeados y elevados para que no se escape nada mientras armás.</li>'
            . '<li><strong>Cierre Magnético Potente:</strong> La tapa se adhiere firmemente a la base metálica, protegiendo el contenido del polvo y la humedad.</li>'
            . '<li><strong>Material Premium:</strong> Construcción en metal resistente con acabado brillante, fácil de limpiar y de larga durabilidad.</li>'
            . '<li><strong>Arte Exclusivo:</strong> Disponible en dos diseños de alto impacto visual (Alien Trip y Purple Flower).</li>'
            . '</ul>'
            . '<p><strong>Especificaciones Técnicas:</strong></p>'
            . '<ul>'
            . '<li><strong>Material:</strong> Metal ligero reforzado.</li>'
            . '<li><strong>Incluye:</strong> Bandeja base + Tapa imantada con diseño a juego.</li>'
            . '<li><strong>Tamaño:</strong> Grande (ideal para tener todos los accesorios en un solo lugar).</li>'
            . '</ul>'
            . '<p><strong>Venta Mayorista y Minorista</strong></p>'
            . '<p>Ideales para Grow Shops y Tabaquerías que buscan productos con alta rotación y excelente margen. Consultá por precios especiales para compras por mayor y renová el stock de tu negocio con lo último en parafernalia.</p>';

        $product23 = Product::firstOrCreate(
            ['title' => 'Bandeja de Enrolado con Tapa Imantada - Edición 4US (Variante 2)'],
            [
                'description' => $description23,
                'is_featured'  => true,
                'offer_active' => false,
            ],
        );

        // ── 3. Prices ──────────────────────────────────────────────────────
        if ($product23->prices()->doesntExist()) {
            $product23->prices()->createMany([
                [
                    'label'        => '1 unidad',
                    'min_quantity' => 1,
                    'price'        => 50000.00,
                    'sort_order'   => 1,
                ],
                [
                    'label'        => 'A partir de 2 unidades',
                    'min_quantity' => 2,
                    'price'        => 40000.00,
                    'sort_order'   => 2,
                ],
            ]);
        }

        // ── 4. Media ───────────────────────────────────────────────────────
        if ($product23->media()->doesntExist()) {
            $basePath = config('media.products_images_path', 'images/products');

            $product23->media()->createMany([
                [
                    'file_path'  => $basePath . '/bandeja-imantada-grande-2-1.jpg',
                    'file_type'  => 'image',
                    'is_primary' => true,
                    'sort_order' => 1,
                ],
                [
                    'file_path'  => $basePath . '/bandeja-imantada-grande-2-2.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 2,
                ],
                [
                    'file_path'  => $basePath . '/bandeja-imantada-grande-2-3.jpg',
                    'file_type'  => 'image',
                    'is_primary' => false,
                    'sort_order' => 3,
                ],
            ]);
        }

        // ── 5. Category relationship ───────────────────────────────────────
        $product23->categories()->syncWithoutDetaching([$category23->id]);
    #endregion

    }
}
