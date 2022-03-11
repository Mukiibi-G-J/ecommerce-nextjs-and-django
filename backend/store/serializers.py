from rest_framework import serializers
from .models import Product, ProductImage, Category


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image", "alt_text"]


class ProductSerializer(serializers.ModelSerializer):
    product_image = ImagesSerializer(many=True, read_only=True)

    class Meta:
        model =Product
        fields = ['id', 'category', 'title', 'description', 'slug', 'regular_price','product_image']
        

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields =['name', 'slug']
    