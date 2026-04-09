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
        $description = '<p>Sumá estilo a tu ritual con la bandeja metálica 4US, pensada para quienes disfrutan cada detalle. Con un diseño inspirado en ilustraciones animadas icónicas y un acabado vibrante, esta bandeja no solo cumple su función, sino que también destaca como pieza de colección.</p>'
            . '<p>Fabricada en metal resistente, ofrece una superficie amplia y bordes elevados que facilitan el armado y mantienen todo en su lugar, evitando pérdidas y desorden. Ideal para uso diario, tanto en casa como para llevar.</p>'
            . '<ul>'
            . '<li>Material metálico resistente</li>'
            . '<li>Bordes curvos para mayor comodidad</li>'
            . '<li>Superficie amplia y fácil de limpiar</li>'
            . '<li>Diseño exclusivo y llamativo</li>'
            . '<li>Perfecta para uso personal o reventa</li>'
            . '</ul>'
            . '<p>Disponible por unidad o en ventas mayoristas. Un producto que combina funcionalidad y estética, ideal para potenciar tu catálogo.</p>';

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
        $description2 = '<p>Sumá estilo a tu ritual con la bandeja metálica 4US, pensada para quienes disfrutan cada detalle. Con un diseño inspirado en ilustraciones animadas icónicas y un acabado vibrante, esta bandeja no solo cumple su función, sino que también destaca como pieza de colección.</p>'
            . '<p>Fabricada en metal resistente, ofrece una superficie amplia y bordes elevados que facilitan el armado y mantienen todo en su lugar, evitando pérdidas y desorden. Ideal para uso diario, tanto en casa como para llevar.</p>'
            . '<ul>'
            . '<li>Material metálico resistente</li>'
            . '<li>Bordes curvos para mayor comodidad</li>'
            . '<li>Superficie amplia y fácil de limpiar</li>'
            . '<li>Diseño exclusivo y llamativo</li>'
            . '<li>Perfecta para uso personal o reventa</li>'
            . '</ul>'
            . '<p>Disponible por unidad o en ventas mayoristas. Un producto que combina funcionalidad y estética, ideal para potenciar tu catálogo.</p>';

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
        $description3 = '<p>Sumá estilo a tu ritual con la bandeja metálica 4US, pensada para quienes disfrutan cada detalle. Con un diseño inspirado en ilustraciones animadas icónicas y un acabado vibrante, esta bandeja no solo cumple su función, sino que también destaca como pieza de colección.</p>'
            . '<p>Fabricada en metal resistente, ofrece una superficie amplia y bordes elevados que facilitan el armado y mantienen todo en su lugar, evitando pérdidas y desorden. Ideal para uso diario, tanto en casa como para llevar.</p>'
            . '<ul>'
            . '<li>Material metálico resistente</li>'
            . '<li>Bordes curvos para mayor comodidad</li>'
            . '<li>Superficie amplia y fácil de limpiar</li>'
            . '<li>Diseño exclusivo y llamativo</li>'
            . '<li>Perfecta para uso personal o reventa</li>'
            . '</ul>'
            . '<p>Disponible por unidad o en ventas mayoristas. Un producto que combina funcionalidad y estética, ideal para potenciar tu catálogo.</p>';

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
        $description4 = '<p>Sumá estilo a tu ritual con la bandeja metálica 4US, pensada para quienes disfrutan cada detalle. Con un diseño inspirado en ilustraciones animadas icónicas y un acabado vibrante, esta bandeja no solo cumple su función, sino que también destaca como pieza de colección.</p>'
            . '<p>Fabricada en metal resistente, ofrece una superficie amplia y bordes elevados que facilitan el armado y mantienen todo en su lugar, evitando pérdidas y desorden. Ideal para uso diario, tanto en casa como para llevar.</p>'
            . '<ul>'
            . '<li>Material metálico resistente</li>'
            . '<li>Bordes curvos para mayor comodidad</li>'
            . '<li>Superficie amplia y fácil de limpiar</li>'
            . '<li>Diseño exclusivo y llamativo</li>'
            . '<li>Perfecta para uso personal o reventa</li>'
            . '</ul>'
            . '<p>Disponible por unidad o en ventas mayoristas. Un producto que combina funcionalidad y estética, ideal para potenciar tu catálogo.</p>';

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
        $description5 = '<p>Sumá estilo a tu ritual con la bandeja metálica 4US, pensada para quienes disfrutan cada detalle. Con un diseño inspirado en ilustraciones animadas icónicas y un acabado vibrante, esta bandeja no solo cumple su función, sino que también destaca como pieza de colección.</p>'
            . '<p>Fabricada en metal resistente, ofrece una superficie amplia y bordes elevados que facilitan el armado y mantienen todo en su lugar, evitando pérdidas y desorden. Ideal para uso diario, tanto en casa como para llevar.</p>'
            . '<ul>'
            . '<li>Material metálico resistente</li>'
            . '<li>Bordes curvos para mayor comodidad</li>'
            . '<li>Superficie amplia y fácil de limpiar</li>'
            . '<li>Diseño exclusivo y llamativo</li>'
            . '<li>Perfecta para uso personal o reventa</li>'
            . '</ul>'
            . '<p>Disponible por unidad o en ventas mayoristas. Un producto que combina funcionalidad y estética, ideal para potenciar tu catálogo.</p>';

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
        $description8 = '<p>El Frasco Triturador Todo en Uno es un accesorio práctico y funcional diseñado para quienes buscan organizar, triturar y preparar su contenido en un solo dispositivo. Su diseño compacto integra múltiples funciones que facilitan el uso diario y mantienen todo en un mismo lugar.</p>'
            . '<p>En la parte inferior incluye un picador desmontable, ideal para triturar de manera eficiente. La sección central cuenta con un visor transparente, que permite ver fácilmente el contenido almacenado sin necesidad de abrir el frasco. En la parte superior incorpora una lupa con luz LED recargable, perfecta para observar el material con mayor detalle.</p>'
            . '<p>Este sistema multifunción combina almacenamiento y trituración en un solo accesorio, ofreciendo comodidad, portabilidad y un diseño moderno pensado para el uso cotidiano.</p>'
            . '<ul>'
            . '<li>Picador (grinder) desmontable</li>'
            . '<li>Frasco contenedor con visor transparente</li>'
            . '<li>Lupa integrada en la tapa</li>'
            . '<li>Luz LED recargable</li>'
            . '<li>Diseño compacto y multifunción</li>'
            . '</ul>'
            . '<p>Disponible por unidad o por mayor, ideal para tabaquerías, grow shops y revendedores que buscan sumar un accesorio práctico e innovador a su catálogo.</p>';

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
        $description9 = '<p>Potenciá tu experiencia con el picador de hierba 4US, diseñado para ofrecer un triturado preciso, uniforme y sin esfuerzo. Fabricado en aleación de zinc resistente, este grinder combina durabilidad, diseño y funcionalidad en un formato compacto ideal para el uso diario.</p>'
            . '<p>Su sistema de 4 piezas incluye dientes de corte tipo diamante que garantizan una molienda eficiente, mientras que el filtro de malla fina permite separar las partículas más finas para un aprovechamiento completo del material. Además, su tapa magnética asegura un cierre firme y seguro durante el uso o transporte.</p>'
            . '<p>Disponible en diseños llamativos y psicodélicos, este picador no solo es funcional sino también un accesorio con estilo dentro de cualquier colección de tabaquería.</p>'
            . '<p><strong>Características:</strong></p>'
            . '<ul>'
            . '<li>Material: Aleación de zinc resistente</li>'
            . '<li>Sistema de 4 piezas con compartimento de almacenamiento</li>'
            . '<li>Dientes de corte tipo diamante para triturado uniforme</li>'
            . '<li>Filtro de malla fina para filtrado de partículas</li>'
            . '<li>Tapa magnética para cierre seguro</li>'
            . '<li>Incluye raspador para recolectar residuos</li>'
            . '<li>Diámetro: 50 mm</li>'
            . '</ul>'
            . '<p>Perfecto para quienes buscan calidad, practicidad y diseño en un solo accesorio. Un producto imprescindible en cualquier smoke shop o tabaquería.</p>'
            . '<p>Disponible para venta por unidad y por mayor.</p>';

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
        $description10 = '<p>Potenciá tu experiencia con el picador de hierba 4US, diseñado para ofrecer un triturado preciso, uniforme y sin esfuerzo. Fabricado en aleación de zinc resistente, este grinder combina durabilidad, diseño y funcionalidad en un formato compacto ideal para el uso diario.</p>'
            . '<p>Su sistema de 4 piezas incluye dientes de corte tipo diamante que garantizan una molienda eficiente, mientras que el filtro de malla fina permite separar las partículas más finas para un aprovechamiento completo del material. Además, su tapa magnética asegura un cierre firme y seguro durante el uso o transporte.</p>'
            . '<p>Disponible en diseños llamativos y psicodélicos, este picador no solo es funcional sino también un accesorio con estilo dentro de cualquier colección de tabaquería.</p>'
            . '<p><strong>Características:</strong></p>'
            . '<ul>'
            . '<li>Material: Aleación de zinc resistente</li>'
            . '<li>Sistema de 4 piezas con compartimento de almacenamiento</li>'
            . '<li>Dientes de corte tipo diamante para triturado uniforme</li>'
            . '<li>Filtro de malla fina para filtrado de partículas</li>'
            . '<li>Tapa magnética para cierre seguro</li>'
            . '<li>Incluye raspador para recolectar residuos</li>'
            . '<li>Diámetro: 50 mm</li>'
            . '</ul>'
            . '<p>Perfecto para quienes buscan calidad, practicidad y diseño en un solo accesorio. Un producto imprescindible en cualquier smoke shop o tabaquería.</p>'
            . '<p>Disponible para venta por unidad y por mayor.</p>';

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
        $description11 = '<p>Los 4US Brown Rolling Paper son papeles para armar de alta calidad, fabricados con pulpa de madera 100% natural y diseñados para ofrecer una combustión pareja y un armado cómodo.</p>'
            . '<p>Su papel brown sin blanquear mantiene un estilo más natural y ligero, permitiendo disfrutar una experiencia de fumado más pura y con mejor tiraje. Además, cuentan con goma arábiga natural, lo que asegura un pegado firme y sencillo al momento de armar.</p>'
            . '<p>Cada display incluye 22 packs, lo que lo convierte en una excelente opción para kioscos, tabaquerías y revendedores que buscan un producto confiable y de buena rotación.</p>'
            . '<p>El diseño del packaging, con una estética colorida e inspirada en la naturaleza, refleja el enfoque natural del producto y lo hace destacar en cualquier mostrador.</p>'
            . '<ul>'
            . '<li>Papel brown natural</li>'
            . '<li>Goma arábiga natural</li>'
            . '<li>Fabricado con 100% pulpa de madera</li>'
            . '<li>Combustión uniforme</li>'
            . '<li>Display de 22 packs</li>'
            . '</ul>'
            . '<p>Disponibles por unidad o por mayor, ideales para consumidores habituales y comercios que buscan sumar un papel de calidad a su catálogo.</p>';

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
        $description12 = '<p>Descubrí una experiencia diferente al armar con los papeles 4US Brown. Diseñados para quienes buscan calidad y estilo, estos papeles están fabricados con material orgánico sin blanquear, ofreciendo una combustión más natural, lenta y uniforme.</p>'
            . '<p>Su formato práctico y liviano los convierte en el compañero ideal para llevar a todos lados, mientras que su diseño psicodélico y vibrante refleja una identidad única, pensada para quienes viven cada momento al máximo.</p>'
            . '<ul>'
            . '<li>Papel orgánico sin blanquear</li>'
            . '<li>Combustión lenta y pareja</li>'
            . '<li>Sabor más puro, sin interferencias</li>'
            . '<li>Pack de 50 hojas</li>'
            . '<li>Ideal para uso personal o reventa</li>'
            . '</ul>'
            . '<p>Disponibles por unidad o en compras mayoristas. Stock permanente para abastecer tu negocio o sumar a tu colección.</p>';

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
        $description13 = '<p>Los 4US Premium Cone son conos prearmados de alta calidad diseñados para quienes buscan practicidad y una experiencia de fumado uniforme. Fabricados con papel ultra fino de origen natural, permiten una combustión pareja que respeta el sabor del contenido.</p>'
            . '<p>Cada cono viene perfectamente armado con filtro incorporado, listo para rellenar sin necesidad de armar manualmente. Esto los convierte en una opción ideal tanto para usuarios habituales como para quienes prefieren una preparación rápida y cómoda.</p>'
            . '<p>El pack incluye 55 conos prearmados, elaborados con papel orgánico blanqueado, garantizando un producto liviano, resistente y de excelente tiraje.</p>'
            . '<ul>'
            . '<li>Papel ultra fino de goma arábiga natural</li>'
            . '<li>Combustión uniforme</li>'
            . '<li>Cono prearmado con filtro</li>'
            . '<li>Papel 100% natural</li>'
            . '<li>Pack de 55 unidades</li>'
            . '</ul>'
            . '<p>Disponibles por unidad o por mayor, ideales para kioscos, tabaquerías y revendedores que buscan ofrecer un producto práctico y de gran rotación.</p>';

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
        $description14 = '<p>Mantén tu material siempre en perfectas condiciones con este contenedor hermético diseñado para conservar aroma, frescura y calidad. Su sistema de cierre a presión con válvula permite liberar el aire interno para lograr un sellado más efectivo, ayudando a preservar el contenido por más tiempo.</p>'
            . '<p>Fabricado con materiales resistentes y livianos, es ideal para transportar de forma segura y discreta. Su diseño exterior con arte psicodélico le da un estilo único que destaca entre los accesorios de tabaquería.</p>'
            . '<p>Perfecto para uso personal o para quienes buscan organizar su kit con accesorios funcionales y con personalidad.</p>'
            . '<p><strong>Características:</strong></p>'
            . '<ul>'
            . '<li>Sistema de cierre hermético con botón de presión</li>'
            . '<li>Conserva aroma y frescura por más tiempo</li>'
            . '<li>Material resistente y liviano</li>'
            . '<li>Diseño artístico psicodélico</li>'
            . '<li>Compacto y fácil de transportar</li>'
            . '</ul>'
            . '<p>Disponible por unidad y también para compra mayorista.</p>';

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
        $description15 = '<p>Picador de alta calidad fabricado en metal resistente, ideal para lograr una molienda uniforme y sin esfuerzo. Su diseño de 3 partes permite triturar el material de forma eficiente, mientras que el compartimento intermedio facilita la recolección sin desperdicios.</p>'
            . '<p>Cuenta con dientes afilados tipo diamante que garantizan un corte preciso, y una tapa con cierre magnético que asegura firmeza durante el uso. Incluye tamiz fino para filtrar partículas más pequeñas, optimizando cada uso.</p>'
            . '<p>Compacto, duradero y fácil de transportar, es una herramienta esencial tanto para uso personal como para reventa en tabaquerías.</p>'
            . '<ul>'
            . '<li>Material: Metal</li>'
            . '<li>Sistema: 3 partes con filtro</li>'
            . '<li>Cierre magnético</li>'
            . '<li>Molienda uniforme y eficiente</li>'
            . '</ul>'
            . '<p>Disponible por unidad y por mayor.</p>';

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
        $description16 = '<p>Práctica, funcional y con un diseño llamativo, esta bandeja imantada es el accesorio ideal para quienes buscan comodidad y orden al momento de preparar. Su base imantada se adhiere a superficies metálicas, evitando movimientos y derrames, brindando mayor estabilidad en cada uso.</p>'
            . '<p>Gracias a sus bordes elevados, permite trabajar sin desperdiciar material, manteniendo todo en un solo lugar. Su tamaño compacto la hace fácil de transportar, perfecta tanto para uso diario como para llevar a cualquier lado.</p>'
            . '<p>El diseño exclusivo le da un estilo único que destaca dentro de cualquier colección de accesorios de tabaquería.</p>'
            . '<ul>'
            . '<li>Base imantada antideslizante</li>'
            . '<li>Bordes elevados para mayor control</li>'
            . '<li>Tamaño práctico y portátil</li>'
            . '<li>Diseño original y llamativo</li>'
            . '</ul>'
            . '<p>Ideal para picar, armar y mantener todo organizado.</p>'
            . '<p>Disponible por unidad y por mayor.</p>';

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
        $description17 = '<p>Práctica, funcional y con un diseño llamativo, esta bandeja imantada es el accesorio ideal para quienes buscan comodidad y orden al momento de preparar. Su base imantada se adhiere a superficies metálicas, evitando movimientos y derrames, brindando mayor estabilidad en cada uso.</p>'
            . '<p>Gracias a sus bordes elevados, permite trabajar sin desperdiciar material, manteniendo todo en un solo lugar. Su tamaño compacto la hace fácil de transportar, perfecta tanto para uso diario como para llevar a cualquier lado.</p>'
            . '<p>El diseño exclusivo le da un estilo único que destaca dentro de cualquier colección de accesorios de tabaquería.</p>'
            . '<ul>'
            . '<li>Base imantada antideslizante</li>'
            . '<li>Bordes elevados para mayor control</li>'
            . '<li>Tamaño práctico y portátil</li>'
            . '<li>Diseño original y llamativo</li>'
            . '</ul>'
            . '<p>Ideal para picar, armar y mantener todo organizado.</p>'
            . '<p>Disponible por unidad y por mayor.</p>';

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
        $description18 = '<p>Cenicero de vidrio resistente con terminación de alta calidad, ideal para acompañar cualquier espacio con estilo y funcionalidad. Su diseño sólido garantiza estabilidad, mientras que sus ranuras permiten apoyar cómodamente cigarrillos o armados.</p>'
            . '<p>Cuenta con una base amplia que facilita la limpieza y evita la acumulación de residuos fuera del área de uso. Disponible en distintos diseños exclusivos, con gráficos llamativos que le dan un toque único y moderno.</p>'
            . '<p>Perfecto tanto para uso personal como para sumar a la oferta de cualquier tabaquería.</p>'
            . '<ul>'
            . '<li>Material: Vidrio resistente</li>'
            . '<li>Ranuras para apoyo seguro</li>'
            . '<li>Fácil de limpiar</li>'
            . '<li>Diseños originales y llamativos</li>'
            . '<li>Base estable y duradera</li>'
            . '</ul>'
            . '<p>Disponible por unidad y por mayor.</p>';

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
        $description19 = '<p>Cenicero de vidrio resistente con terminación de alta calidad, ideal para acompañar cualquier espacio con estilo y funcionalidad. Su diseño sólido garantiza estabilidad, mientras que sus ranuras permiten apoyar cómodamente cigarrillos o armados.</p>'
            . '<p>Cuenta con una base amplia que facilita la limpieza y evita la acumulación de residuos fuera del área de uso. Disponible en distintos diseños exclusivos, con gráficos llamativos que le dan un toque único y moderno.</p>'
            . '<p>Perfecto tanto para uso personal como para sumar a la oferta de cualquier tabaquería.</p>'
            . '<ul>'
            . '<li>Material: Vidrio resistente</li>'
            . '<li>Ranuras para apoyo seguro</li>'
            . '<li>Fácil de limpiar</li>'
            . '<li>Diseños originales y llamativos</li>'
            . '<li>Base estable y duradera</li>'
            . '</ul>'
            . '<p>Disponible por unidad y por mayor.</p>';

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
        $description20 = '<p>Cenicero de vidrio resistente con terminación de alta calidad, ideal para acompañar cualquier espacio con estilo y funcionalidad. Su diseño sólido garantiza estabilidad, mientras que sus ranuras permiten apoyar cómodamente cigarrillos o armados.</p>'
            . '<p>Cuenta con una base amplia que facilita la limpieza y evita la acumulación de residuos fuera del área de uso. Disponible en distintos diseños exclusivos, con gráficos llamativos que le dan un toque único y moderno.</p>'
            . '<p>Perfecto tanto para uso personal como para sumar a la oferta de cualquier tabaquería.</p>'
            . '<ul>'
            . '<li>Material: Vidrio resistente</li>'
            . '<li>Ranuras para apoyo seguro</li>'
            . '<li>Fácil de limpiar</li>'
            . '<li>Diseños originales y llamativos</li>'
            . '<li>Base estable y duradera</li>'
            . '</ul>'
            . '<p>Disponible por unidad y por mayor.</p>';

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
        $description21 = '<p>Cenicero de vidrio resistente con terminación de alta calidad, ideal para acompañar cualquier espacio con estilo y funcionalidad. Su diseño sólido garantiza estabilidad, mientras que sus ranuras permiten apoyar cómodamente cigarrillos o armados.</p>'
            . '<p>Cuenta con una base amplia que facilita la limpieza y evita la acumulación de residuos fuera del área de uso. Disponible en distintos diseños exclusivos, con gráficos llamativos que le dan un toque único y moderno.</p>'
            . '<p>Perfecto tanto para uso personal como para sumar a la oferta de cualquier tabaquería.</p>'
            . '<ul>'
            . '<li>Material: Vidrio resistente</li>'
            . '<li>Ranuras para apoyo seguro</li>'
            . '<li>Fácil de limpiar</li>'
            . '<li>Diseños originales y llamativos</li>'
            . '<li>Base estable y duradera</li>'
            . '</ul>'
            . '<p>Disponible por unidad y por mayor.</p>';

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
