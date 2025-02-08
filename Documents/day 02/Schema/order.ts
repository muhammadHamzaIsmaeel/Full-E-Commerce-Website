export default {
    name: 'order',
    type: 'document',
    fields: [
    { name: 'customerName', type: 'string', title: 'Customer Name' },
    { name: 'products', type: 'array', of: [{ type: 'string' }], title: 'Products' },
    { name: 'totalPrice', type: 'number', title: 'Total Price' },
    { name: 'status', type: 'string', title: 'Order Status' }
    ]
   };