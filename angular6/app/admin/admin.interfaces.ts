/* Products */

export interface ProductModel {
    _id: string;
    vip: boolean;
    name: string;
    slug: string;
    description: string;
    image: string;
    category:  { _id: string, name: string };
    group:     { _id: string, name: string };
    brand:     { _id: string, name: string };
    createdAt: Date;
}

export const ProductColumns = [
    'position',
    'image',
    'name',
    'vip',
    'category',
    'group',
    'brand',
    'created'
];

/* Brands */

export interface BrandModel {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    createdAt: Date;
}

export const BrandColumns = [ 'position', 'image', 'name', 'created' ];


/* Group */

export interface GroupModel {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    category:  { _id: string, name: string };
    createdAt: Date;
}

export const GroupColumns = [ 'position', 'image', 'name', 'category', 'created' ];

/* Category */

export interface CategoryModel {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    createdAt: Date;
}

export const CategoryColumns = [ 'position', 'image', 'name', 'created' ];

/* Gallery */

export interface GalleryModel {
    _id: string;
    name: string;
    description: string;
    gallery: string;
    imagePath: string;
    createdAt: Date;
}

export const GalleryColumns = [ 'position', 'image', 'name', 'description', 'gallery', 'created' ];

/* Pricelist */

export interface PricelistModel {
    _id: string;
    name: string;
    description: string;
    price: string;
    createdAt: Date;
}

export const PricelistColumns = [ 'position', 'name', 'description', 'price', 'created' ];

