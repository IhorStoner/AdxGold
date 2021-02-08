import React from 'react'
import { LiqPayPay } from "react-liqpay";
import config from '../../config/default.json'

const publicKey = 'sandbox_i40704831909'
const privateKey ='sandbox_I5Vc22b5lsbvzpOpcwITLPEcs4JTkxjiQKysNnX0'

export default function Liqpay({price = 0 }) {
  const payInfo = {
    amount: price,
    currency: 'RUB',
    title: 'PAY'
  }

  const ButtonComponent = () => (
    <button style={{
      backgroundColor: '#337ab7',
      color: '#fff',
      borderColor: '#2e6da4',
      border: '1px solid transparent',
      borderRadius: '4px',
      padding: '6px 12px',
      cursor: 'pointer'
    }}>
      {`${payInfo.title} ${payInfo.amount} ${payInfo.currency}`}
    </button>
  )

  return (
    <div style={{ display: "flex" }}>
      <LiqPayPay
        publicKey={publicKey}
        privateKey={privateKey}
        amount={price}
        description="Payment for product"
        currency="RUB"
        orderId={Math.floor(1 + Math.random() * 900000000)}
        result_url={`http://localhost:3000`}
        server_url={`${config.serverUrl}/api/liqpay`}
        product_description="new ad"
        style={{ margin: "8px" }}
        disabled={false}
      />
    </div>
  )
}
