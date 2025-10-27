import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

type ViewMode = 'grid' | 'list';

interface ProductCardProps {
  item: {
    _id?: string;
    title: string;
    category: string;
    price: number;
    quantity: number;
    images?: string[];
  };
  viewMode: ViewMode;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, viewMode, onPress }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = item.images || [];
  
  const getImageUrl = (img: string) => {
    return img?.startsWith('http') ? img : `http://192.168.84.125:3001${img}`;
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const imageWidth = viewMode === 'grid' ? CARD_WIDTH : 80;
    const index = Math.round(scrollPosition / imageWidth);
    setCurrentImageIndex(index);
  };

  if (viewMode === 'grid') {
    return (
      <View style={styles.gridCard}>
        <View style={styles.imageContainer}>
          {images.length > 0 ? (
            <>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={styles.imageScrollView}
                nestedScrollEnabled={true}
              >
                {images.map((img: string, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: getImageUrl(img) }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
              {images.length > 1 && (
                <View style={styles.miniImageDots}>
                  {images.map((_: any, index: number) => (
                    <View
                      key={index}
                      style={[
                        styles.miniDot,
                        index === currentImageIndex && styles.miniDotActive,
                      ]}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="image-outline" size={40} color="#ccc" />
            </View>
          )}
          {item.quantity === 0 && (
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.cardContent}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.productCategory}>{item.category}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.productQuantity}>Qty: {item.quantity}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // List view
  return (
    <View style={styles.listCard}>
      <View style={styles.listImageContainer}>
        {images.length > 0 ? (
          <>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={styles.listImageScrollView}
              nestedScrollEnabled={true}
            >
              {images.map((img: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri: getImageUrl(img) }}
                  style={styles.listImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            {images.length > 1 && (
              <View style={styles.miniImageDots}>
                {images.map((_: any, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.miniDot,
                      index === currentImageIndex && styles.miniDotActive,
                    ]}
                  />
                ))}
              </View>
            )}
          </>
        ) : (
          <View style={styles.listPlaceholder}>
            <Ionicons name="image-outline" size={30} color="#ccc" />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.listContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.listCategory}>{item.category}</Text>
        <View style={styles.listFooter}>
          <Text style={styles.listPrice}>${item.price.toFixed(2)}</Text>
          <Text style={[styles.listQuantity, item.quantity === 0 && styles.outOfStockQty]}>
            {item.quantity === 0 ? 'Out of Stock' : `Qty: ${item.quantity}`}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} style={styles.chevronButton}>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Grid View Styles
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 4,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    position: 'relative',
    overflow: 'hidden',
  },
  imageScrollView: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
  },
  productImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff3b30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  outOfStockText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    height: 36,
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  productQuantity: {
    fontSize: 12,
    color: '#666',
  },
  // List View Styles
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  listImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
    position: 'relative',
  },
  listImageScrollView: {
    width: 80,
    height: 80,
  },
  listImage: {
    width: 80,
    height: 80,
  },
  listPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  listCategory: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  listFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  listQuantity: {
    fontSize: 13,
    color: '#666',
  },
  outOfStockQty: {
    color: '#ff3b30',
    fontWeight: '600',
  },
  chevronButton: {
    padding: 8,
    marginLeft: 4,
  },
  // Mini image dots for swipe indicator
  miniImageDots: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    zIndex: 10,
  },
  miniDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  miniDotActive: {
    backgroundColor: '#fff',
    width: 12,
  },
});
