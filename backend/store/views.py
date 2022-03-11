import re
from typing import List
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView 
from . import models
from . models import Product, Category
from . serializers import ProductSerializer, CategorySerializer


class ProductListView(ListAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    

class Product(RetrieveAPIView):
    lookup_field = "slug"
    queryset=Product.objects.all()
    serializer_class = ProductSerializer

class CategoryItemView(ListAPIView):
    serializer_class = ProductSerializer
    
    # def get_queryset(self):
    #     return models.Product.objects.filter(category__slug=self.kwargs['slug'])
    def get_queryset(self):
            return models.Product.objects.filter(category__slug=self.kwargs['slug'].get_descendant(include_self=True))

class CategoryListView(ListAPIView):
    queryset = Category.objects.filter(level=1)
    serializer_class = CategorySerializer
    
    
    
