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

    
    }
}
