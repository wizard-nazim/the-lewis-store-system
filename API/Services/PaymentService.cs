using API.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services;

public class PaymentService
{
    public Task<FakePaymentResult> CreateOrUpdatePaymentIntent(Basket basket)
    {
        var subtotal = basket.Items.Sum(i => i.Quantity * i.Product.Price);
        var deliveryFee = subtotal > 10000 ? 0 : 500;

        // Generate fake payment intent
        var paymentIntentId = basket.PaymentIntentId ?? Guid.NewGuid().ToString();

        return Task.FromResult(new FakePaymentResult
        {
            Id = paymentIntentId,                     // maps to basket.PaymentIntentId
            ClientSecret = Guid.NewGuid().ToString(), // fake secret
            Amount = subtotal + deliveryFee,
            Success = true
        });
    }
}

// Fake payment result
public class FakePaymentResult
{
    public string Id { get; set; }             // Fake PaymentIntent.Id
    public string ClientSecret { get; set; }   // Fake PaymentIntent.ClientSecret
    public long Amount { get; set; }           // Total in cents
    public bool Success { get; set; }          // Simulate payment success
}
