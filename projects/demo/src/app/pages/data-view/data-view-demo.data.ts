export type DemoInventoryStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface DemoProduct {
  readonly id: number;
  readonly sku: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly imageUrl: string;
  readonly price: number;
  readonly rating: number;
  readonly inventoryStatus: DemoInventoryStatus;
  readonly inventoryCount: number;
}

interface DemoProductSeed {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly rating: number;
  readonly inventoryStatus: DemoInventoryStatus;
  readonly inventoryCount: number;
  readonly imageUrl: string;
}

const PRODUCT_SEEDS: readonly DemoProductSeed[] = [
  {
    name: 'Bamboo Watch',
    description: 'Sustainable unisex watch with minimalist dial and leather strap.',
    category: 'Accessories',
    price: 64,
    rating: 4.6,
    inventoryStatus: 'IN_STOCK',
    inventoryCount: 58,
    imageUrl: 'https://picsum.photos/seed/bamboo-watch/320/200',
  },
  {
    name: 'Blue Band',
    description: 'Premium fitness band with heart-rate and sleep tracking support.',
    category: 'Wearables',
    price: 79,
    rating: 4.4,
    inventoryStatus: 'IN_STOCK',
    inventoryCount: 92,
    imageUrl: 'https://picsum.photos/seed/blue-band/320/200',
  },
  {
    name: 'Black Watch',
    description: 'Matte black chronograph designed for daily office and travel use.',
    category: 'Accessories',
    price: 88,
    rating: 4.3,
    inventoryStatus: 'LOW_STOCK',
    inventoryCount: 11,
    imageUrl: 'https://picsum.photos/seed/black-watch/320/200',
  },
  {
    name: 'Green Earbuds',
    description: 'Noise-isolating true wireless earbuds with compact charging case.',
    category: 'Audio',
    price: 95,
    rating: 4.5,
    inventoryStatus: 'IN_STOCK',
    inventoryCount: 77,
    imageUrl: 'https://picsum.photos/seed/green-earbuds/320/200',
  },
  {
    name: 'Purple Headphones',
    description: 'Over-ear headphones with adaptive EQ and 30-hour battery life.',
    category: 'Audio',
    price: 129,
    rating: 4.7,
    inventoryStatus: 'LOW_STOCK',
    inventoryCount: 14,
    imageUrl: 'https://picsum.photos/seed/purple-headphones/320/200',
  },
  {
    name: 'Silver Phone',
    description: '6.1-inch smartphone with pro-grade camera and all-day battery.',
    category: 'Mobile',
    price: 699,
    rating: 4.8,
    inventoryStatus: 'IN_STOCK',
    inventoryCount: 46,
    imageUrl: 'https://picsum.photos/seed/silver-phone/320/200',
  },
  {
    name: 'Smart Speaker Mini',
    description: 'Voice assistant speaker with room-aware sound and stereo pairing.',
    category: 'Smart Home',
    price: 49,
    rating: 4.2,
    inventoryStatus: 'OUT_OF_STOCK',
    inventoryCount: 0,
    imageUrl: 'https://picsum.photos/seed/smart-speaker-mini/320/200',
  },
  {
    name: 'Pro Mechanical Keyboard',
    description: 'Low-profile mechanical keyboard with hot-swap switches and RGB.',
    category: 'Computing',
    price: 139,
    rating: 4.7,
    inventoryStatus: 'IN_STOCK',
    inventoryCount: 41,
    imageUrl: 'https://picsum.photos/seed/pro-keyboard/320/200',
  },
  {
    name: 'Ergo Mouse',
    description: 'Wireless ergonomic mouse with precision sensor and silent clicks.',
    category: 'Computing',
    price: 59,
    rating: 4.1,
    inventoryStatus: 'LOW_STOCK',
    inventoryCount: 9,
    imageUrl: 'https://picsum.photos/seed/ergo-mouse/320/200',
  },
  {
    name: 'Travel Laptop Sleeve',
    description: 'Water-resistant sleeve with protective lining and zip pocket.',
    category: 'Bags',
    price: 39,
    rating: 4.0,
    inventoryStatus: 'IN_STOCK',
    inventoryCount: 103,
    imageUrl: 'https://picsum.photos/seed/laptop-sleeve/320/200',
  },
  {
    name: 'Studio Desk Lamp',
    description: 'Dimmable desk lamp with USB-C power delivery and touch controls.',
    category: 'Home Office',
    price: 85,
    rating: 4.4,
    inventoryStatus: 'IN_STOCK',
    inventoryCount: 36,
    imageUrl: 'https://picsum.photos/seed/studio-lamp/320/200',
  },
  {
    name: 'Carbon Backpack',
    description: 'Lightweight commuter backpack with tablet sleeve and anti-theft zip.',
    category: 'Bags',
    price: 92,
    rating: 4.5,
    inventoryStatus: 'LOW_STOCK',
    inventoryCount: 12,
    imageUrl: 'https://picsum.photos/seed/carbon-backpack/320/200',
  },
];

function cycleInventoryStatus(status: DemoInventoryStatus, round: number): DemoInventoryStatus {
  if (round % 5 === 0) {
    return status;
  }

  if (round % 5 === 3) {
    return 'LOW_STOCK';
  }

  return status;
}

function buildDemoProducts(rounds: number): DemoProduct[] {
  const products: DemoProduct[] = [];

  for (let roundIndex: number = 0; roundIndex < rounds; roundIndex += 1) {
    PRODUCT_SEEDS.forEach((seed: DemoProductSeed, seedIndex: number): void => {
      const id: number = roundIndex * PRODUCT_SEEDS.length + seedIndex + 1;
      const roundMultiplier: number = roundIndex + 1;
      const adjustedPrice: number = Number((seed.price + roundMultiplier * 1.75).toFixed(2));
      const adjustedRating: number = Math.min(
        5,
        Number((seed.rating - roundIndex * 0.05).toFixed(1))
      );
      const adjustedInventory: number = Math.max(0, seed.inventoryCount - roundIndex * 4);
      const inventoryStatus: DemoInventoryStatus =
        adjustedInventory === 0
          ? 'OUT_OF_STOCK'
          : cycleInventoryStatus(seed.inventoryStatus, roundIndex);

      products.push({
        id,
        sku: `DV-${String(id).padStart(4, '0')}`,
        name: `${seed.name} ${roundMultiplier}`,
        description: `${seed.description} (Series ${roundMultiplier})`,
        category: seed.category,
        imageUrl: `${seed.imageUrl}?series=${roundMultiplier}`,
        price: adjustedPrice,
        rating: adjustedRating,
        inventoryStatus,
        inventoryCount: adjustedInventory,
      });
    });
  }

  return products;
}

export const DATA_VIEW_DEMO_PRODUCTS: DemoProduct[] = buildDemoProducts(6);
