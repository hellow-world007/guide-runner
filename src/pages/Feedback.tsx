import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetFeedbackQuery } from '@/store/api/restaurantApi';

// Mock feedback data
const mockFeedback = [
  { id: '1', customerName: 'Jons Sena', rating: 4.5, comment: 'Very good', createdAt: '2 days ago' },
  { id: '2', customerName: 'Sofia', rating: 4.0, comment: 'Yummy', createdAt: '2 days ago' },
  { id: '3', customerName: 'Anandreansyah', rating: 4.5, comment: 'hah not bad', createdAt: '2 days ago' },
  { id: '4', customerName: 'Anandreansyah', rating: 4.5, comment: 'the best', createdAt: '2 days ago' },
];

const Feedback = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Customer Feedback</h1>
        <p className="text-muted-foreground">Customer reviews and ratings</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFeedback.map((feedback, index) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {feedback.customerName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{feedback.customerName}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-primary">★</span>
                        <span className="font-medium">{feedback.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback.createdAt}</p>
                    <p className="text-sm">{feedback.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;