import { useState } from 'react';
import { useNotifications } from './NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  ArrowLeft,
  CreditCard,
  Download,
  Edit,
  Check,
  AlertTriangle,
  Star,
  Zap,
  Building,
  Crown,
  Calendar,
  DollarSign,
  FileText,
  Lock,
  Plus,
  Gift,
  ExternalLink,
  Shield
} from 'lucide-react';

interface BillingSettingsProps {
  onBack: () => void;
  userType: 'candidate' | 'employer' | 'admin';
}

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  current?: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'failed' | 'pending' | 'refunded';
  description: string;
  downloadUrl?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export function BillingSettings({ onBack, userType }: BillingSettingsProps) {
  const { showToast } = useNotifications();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  // Mock data based on user type
  const candidatePlans: Plan[] = [
    {
      id: 'candidate-basic',
      name: 'Basic',
      price: 0,
      billing: 'monthly',
      features: ['5 job applications per month', 'Basic AI matching', 'Profile visibility'],
      current: userType === 'candidate'
    },
    {
      id: 'candidate-pro',
      name: 'Pro',
      price: 19,
      billing: 'monthly',
      features: ['Unlimited applications', 'Advanced AI matching', 'Priority support', 'Interview insights'],
      popular: true
    },
    {
      id: 'candidate-premium',
      name: 'Premium',
      price: 39,
      billing: 'monthly',
      features: ['Everything in Pro', 'Personal career coach', 'Resume optimization', 'Salary insights']
    }
  ];

  const employerPlans: Plan[] = [
    {
      id: 'employer-startup',
      name: 'Startup',
      price: 49,
      billing: 'monthly',
      features: ['5 job postings', 'Basic candidate search', 'Interview scheduling'],
      current: userType === 'employer'
    },
    {
      id: 'employer-growth',
      name: 'Growth',
      price: 99,
      billing: 'monthly',
      features: ['Unlimited postings', 'Advanced search', 'Team collaboration', 'Analytics dashboard'],
      popular: true
    },
    {
      id: 'employer-enterprise',
      name: 'Enterprise',
      price: 199,
      billing: 'monthly',
      features: ['Everything in Growth', 'Custom branding', 'API access', 'Dedicated support']
    }
  ];

  const plans = userType === 'candidate' ? candidatePlans : userType === 'employer' ? employerPlans : [];
  const currentPlan = plans.find(p => p.current) || plans[0];

  const mockInvoices: Invoice[] = [
    {
      id: 'inv_001',
      date: '2024-01-01',
      amount: userType === 'candidate' ? 19 : 49,
      status: 'paid',
      description: `${currentPlan.name} Plan - January 2024`
    },
    {
      id: 'inv_002',
      date: '2023-12-01',
      amount: userType === 'candidate' ? 19 : 49,
      status: 'paid',
      description: `${currentPlan.name} Plan - December 2023`
    },
    {
      id: 'inv_003',
      date: '2023-11-01',
      amount: userType === 'candidate' ? 19 : 49,
      status: 'paid',
      description: `${currentPlan.name} Plan - November 2023`
    }
  ];

  const mockPaymentMethod: PaymentMethod = {
    id: 'pm_001',
    type: 'card',
    brand: 'visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardBrandIcon = (brand: string) => {
    // In a real app, you'd use actual card brand icons
    return '💳';
  };

  const handlePlanChange = (planId: string) => {
    showToast({
      type: 'success',
      title: 'Plan updated',
      message: 'Your subscription has been updated successfully.',
      duration: 3000
    });
  };

  const handleCancelSubscription = () => {
    showToast({
      type: 'info',
      title: 'Subscription cancelled',
      message: 'Your subscription will remain active until the end of the billing period.',
      duration: 5000
    });
    setShowCancelDialog(false);
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === 'jobitu2024') {
      showToast({
        type: 'success',
        title: 'Promo code applied',
        message: '20% discount applied to your next billing cycle.',
        duration: 3000
      });
      setPromoCode('');
    } else {
      showToast({
        type: 'error',
        title: 'Invalid promo code',
        message: 'The promo code you entered is not valid.',
        duration: 3000
      });
    }
  };

  if (userType === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-orange-50/30">
        <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 w-8 h-8 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">Admin Access</h1>
                    <p className="text-sm text-muted-foreground">Billing not applicable for admin accounts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Shield className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Admin Account</h2>
              <p className="text-muted-foreground text-center">
                Admin accounts have full platform access without subscription requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Billing & Subscription</h1>
                  <p className="text-sm text-muted-foreground">Manage your subscription and payment methods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentPlan.price === 0 ? <Star className="h-5 w-5" /> : <Crown className="h-5 w-5" />}
              Current Plan
            </CardTitle>
            <CardDescription>
              You are currently on the {currentPlan.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {currentPlan.name}
                  {currentPlan.popular && <Badge className="bg-blue-600">Popular</Badge>}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {currentPlan.price === 0 ? 'Free' : `$${currentPlan.price}`}
                  {currentPlan.price > 0 && <span className="text-sm text-muted-foreground">/month</span>}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Next billing: February 1, 2024
                </p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Change Plan</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Choose Your Plan</DialogTitle>
                      <DialogDescription>
                        Select the plan that best fits your needs
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      {plans.map((plan) => (
                        <Card key={plan.id} className={`relative ${plan.popular ? 'border-blue-500 shadow-md' : ''}`}>
                          {plan.popular && (
                            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                              Most Popular
                            </Badge>
                          )}
                          <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center gap-2">
                              {plan.price === 0 ? <Star className="h-5 w-5" /> : plan.name === 'Enterprise' ? <Crown className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                              {plan.name}
                            </CardTitle>
                            <div className="text-3xl font-bold text-blue-600">
                              {plan.price === 0 ? 'Free' : `$${plan.price}`}
                              {plan.price > 0 && <span className="text-sm text-muted-foreground">/month</span>}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 mb-4">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-600" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button 
                              className="w-full" 
                              variant={plan.current ? "secondary" : "default"}
                              disabled={plan.current}
                              onClick={() => handlePlanChange(plan.id)}
                            >
                              {plan.current ? 'Current Plan' : 'Select Plan'}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                {currentPlan.price > 0 && (
                  <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-red-600 hover:bg-red-50">
                        Cancel Subscription
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Subscription</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                          Keep Subscription
                        </Button>
                        <Button variant="destructive" onClick={handleCancelSubscription}>
                          Cancel Subscription
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
            <CardDescription>
              Manage your payment methods and billing information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getCardBrandIcon(mockPaymentMethod.brand)}</div>
                <div>
                  <p className="font-medium capitalize">
                    {mockPaymentMethod.brand} •••• {mockPaymentMethod.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expires {mockPaymentMethod.expiryMonth}/{mockPaymentMethod.expiryYear}
                  </p>
                </div>
                {mockPaymentMethod.isDefault && (
                  <Badge variant="outline">Default</Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Card
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                      <DialogDescription>
                        Add a new credit or debit card for payments
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardholder">Cardholder Name</Label>
                        <Input id="cardholder" placeholder="John Doe" />
                      </div>
                      <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" onClick={() => setShowAddCardDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          showToast({
                            type: 'success',
                            title: 'Card added',
                            message: 'Your payment method has been added successfully.',
                            duration: 3000
                          });
                          setShowAddCardDialog(false);
                        }}>
                          Add Card
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Your payment information is secured with bank-level encryption. We use Stripe for processing payments.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Billing History
            </CardTitle>
            <CardDescription>
              Download your invoices and view payment history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>${invoice.amount}.00</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Company Info & Promo Codes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Info */}
          {userType === 'employer' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Company Information
                </CardTitle>
                <CardDescription>
                  Tax and billing address information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="TechFlow Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                  <Input id="tax-id" placeholder="Enter your tax ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Billing Address</Label>
                  <Input id="billing-address" placeholder="123 Main St, City, State 12345" />
                </div>
                <Button variant="outline" size="sm">
                  Update Information
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Promo Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Promotional Code
              </CardTitle>
              <CardDescription>
                Have a promo code? Enter it here to get a discount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={handleApplyPromoCode} disabled={!promoCode}>
                  Apply
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Try: JOBITU2024 for 20% off your next billing cycle
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}