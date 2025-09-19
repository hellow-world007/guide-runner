import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetMenuItemsQuery } from '@/store/api/restaurantApi';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';

// Mock data for menu items
const mockMenuItems = [
  {
    id: '1',
    name: 'Chocolate Brownie',
    description: 'Premium Cocoa, Melted Chocolate, And A Hint Of Vanilla, Creating A Moist, Fudgy Center With A Crisp, Crackly Top.',
    price: 15.00,
    category: 'dessert' as const,
    isPopular: true,
    isAvailable: true,
    image: '/placeholder-brownie.jpg',
  },
  {
    id: '2',
    name: 'Burger',
    description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore.',
    price: 12.00,
    category: 'meal' as const,
    isPopular: true,
    isAvailable: true,
    image: '/placeholder-burger.jpg',
  },
  {
    id: '3',
    name: 'Macarons',
    description: 'Delicate Vanilla And Chocolate Macarons, Featuring A Crisp Outer Shell And A Smooth.',
    price: 12.00,
    category: 'dessert' as const,
    isPopular: true,
    isAvailable: true,
    image: '/placeholder-macarons.jpg',
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce, parmesan cheese, croutons with our signature caesar dressing.',
    price: 8.00,
    category: 'vegan' as const,
    isPopular: false,
    isAvailable: true,
    image: '/placeholder-salad.jpg',
  },
  {
    id: '5',
    name: 'Strawberry Shake',
    description: 'Fresh strawberries blended with premium vanilla ice cream and milk.',
    price: 6.00,
    category: 'drink' as const,
    isPopular: false,
    isAvailable: true,
    image: '/placeholder-shake.jpg',
  },
];

interface AddItemFormData {
  name: string;
  category: string;
  price: string;
  description: string;
}

const categories = [
  { value: 'snack', label: 'Snack' },
  { value: 'meal', label: 'Meal' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'drink', label: 'Drink' },
];

const Inventory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddItemFormData>({
    name: '',
    category: 'meal',
    price: '',
    description: '',
  });

  const filteredItems = mockMenuItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const popularItems = filteredItems.filter(item => item.isPopular);
  const allItems = filteredItems.filter(item => !item.isPopular);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowAddForm(false);
    setFormData({ name: '', category: 'meal', price: '', description: '' });
  };

  const handleEdit = (itemId: string) => {
    const item = mockMenuItems.find(i => i.id === itemId);
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price.toString(),
        description: item.description,
      });
      setEditingItem(itemId);
      setShowAddForm(true);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingItem(null);
    setFormData({ name: '', category: 'meal', price: '', description: '' });
  };

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleCancel}>
              ← Back Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Inventory Management</h1>
              <p className="text-muted-foreground">
                {editingItem ? 'Edit Menu Item' : 'Add New Inventory'}
              </p>
            </div>
          </div>
        </motion.div>

        <Card className="max-w-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Item name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mushroom Risotto"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="15.00"
                    className="pl-8"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Creamy Mushroom Risotto, Cooked To Perfection With Arborio Rice, Wild Mushrooms, Parmesan Cheese, And White Wine."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Button type="button" variant="outline">Upload</Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click to upload an image
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your menu items and inventory</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          size="sm"
        >
          All Categories
        </Button>
        {categories.map(category => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.value)}
            size="sm"
            className="capitalize"
          >
            {category.label}
          </Button>
        ))}
      </motion.div>

      {/* Most Popular Section */}
      {popularItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Most Popular</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Image</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge variant="secondary">Popular</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item.id)}
                          >
                            <PencilIcon className="h-4 w-4 mr-1" />
                            Edit info
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Foods Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">All Foods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Image</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Edit info
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Inventory;