'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { ArrowRight2, ArrowLeft2, CloseCircle } from 'iconsax-react';
import { allianz, creditCard, dashboardVehicle, leadway, successful, transfer, truck } from '../public/images/webp';
import Image from 'next/image';
import { fetchVehicles } from '../services/dataService';
import { useRouter } from 'next/navigation';

const Modal = ({ isOpen, closeModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleData, setVehicleData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const response = await fetchVehicles();
        setVehicleData(response.data.vehicles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllVehicles();
  }, []);

  const nextStep = () => {
    if (currentStep < 10) setCurrentStep(currentStep + 1);
  };


  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <p className="font-semibold text-2xl">Choose Your Service</p>
            <div className="py-5">
              <div className="flex items-center justify-between py-5">
                <div className="flex items-center space-x-5">
                  <Image src={truck} alt='truck' />
                  <h3 className="text-lg">Order a Truck</h3>
                </div>
                <ArrowRight2 size="32" color="#000" variant="TwoTone" />
              </div>
              <div className="flex items-center justify-between py-5">
                <div className="flex items-center space-x-5">
                  <Image src={dashboardVehicle} alt='vehicle' />
                  <h3 className="text-lg">Farm Vehicle Rentals</h3>
                </div>
                <ArrowRight2 size="32" color="#000" variant="TwoTone" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <p className="font-semibold text-2xl">Select Insurance</p>
            <div className="py-5">
              <p className="mb-10">Would you like to insure your order for extra protection?</p>
              <div>
                <div className="flex items-center justify-between py-5">
                  <label htmlFor="withInsurance">Get coverage in case of any damages or issues</label>
                  <input type="radio" name="insurance" id="withInsurance" />
                </div>
                <div className="flex items-center justify-between py-5">
                  <label htmlFor="withoutInsurance">Proceed Without Insurance</label>
                  <input type="radio" name="insurance" id="withoutInsurance" />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <p className="font-semibold text-2xl">Select Insurance</p>
            <div className="py-5">
              <p className="mb-10">Ensure safe transportation with one of our trusted insurance providers</p>
              <div className="space-y-5">
                <div className="flex items-center justify-between space-x-10 cursor-pointer border rounded-lg p-5 hover:bg-primary/10 hover:border-primary">
                  <Image src={allianz} className='w-[20%]' alt='insurance' />
                  <p className='w-[50%]'>Covers up to ₦500,000 for damage, theft, and accidents.</p>
                  <p className='w-[30%]'>NGN 500.00/trip</p>
                </div>
                <div className="flex items-center justify-between space-x-10 cursor-pointer border rounded-lg p-5 hover:bg-primary/10 hover:border-primary">
                  <Image src={leadway} className='w-[20%]' alt='insurance' />
                  <p className='w-[50%]'>Covers up to ₦500,000 for damage, theft, and accidents.</p>
                  <p className='w-[30%]'>NGN 500.00/trip</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <p className="font-semibold text-2xl">Provide Order Details</p>
            <div className="py-5">
              <div className="space-y-5">
                <input type="text" name="pickupLocation" id="pickupLocation" className="form-input" placeholder='Pickup Location' />
                <input type="text" name="dropoffLocation" id="dropoffLocation" className="form-input" placeholder='Dropoff Location' />
                <div className="form-input">
                  <select name="typeOfGoods" id="typeOfGoods" className='w-full bg-transparent outline-none'>
                    <option value="">Type of Goods</option>
                    <option value="">Perishable (Tomato, Pepper)</option>
                    <option value="">Non Perishable (Rice)</option>
                  </select>
                </div>
                <input type="text" name="weightOrSize" id="weightOrSize" className="form-input" placeholder='Weight/Size of Goods' />
                <input type="text" name="quantity" id="quantity" className="form-input" placeholder='Quantity' />
                <div className="form-input flex">
                  <span className='whitespace-nowrap'>Preferred Date/Time:</span>
                  <input type="datetime-local" name="dateAndTime" id="dateAndTime" className='bg-transparent outline-none pl-10 w-full' />
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <p className="font-semibold text-2xl">Provide Order Details</p>
            <div className="py-5">
              <div className="space-y-5">
                <div className="form-input">
                  <select name="vehicleType" id="vehicleType" className='w-full bg-transparent outline-none'>
                    <option value="">Vehicle Type</option>
                    <option value="">Truck</option>
                    <option value="">Tractor</option>
                  </select>
                </div>
                <div className="form-input">
                  <select name="rentalDuration" id="rentalDuration" className='w-full bg-transparent outline-none'>
                    <option value="">Rental Duration</option>
                    <option value="">2 Weeks</option>
                    <option value="">5 Weeks</option>
                    <option value="">2 Months</option>
                  </select>
                </div>
                <input type="text" name="location" id="location" className="form-input" placeholder='Location' />
                <div className="form-input flex">
                  <span className='whitespace-nowrap'>Start Date/Time:</span>
                  <input type="datetime-local" name="dateAndTime" id="startDateAndTime" className='bg-transparent outline-none pl-10 w-full' />
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <p className="font-semibold text-2xl">Recommended Vehicles</p>
            <p className='py-3'>Best option based on availability, price, and type.</p>
            <hr />
            <div className="py-5">
              {vehicleData.length > 0 && (
                <div className='space-y-6 h-56 overflow-y-scroll custom-scrollbar'>
                  <p className=''>Featured vehicles</p>
                  <div className="space-y-5">
                    {vehicleData.map((vehicle) => {
                      const limitedName = vehicle.name.split(" ").slice(0, 3).join(" ");

                      return (
                        <div key={vehicle.id} className="flex items-center space-x-3 hover:bg-primary/10 hover:border-2 hover:border-primary p-3 rounded-lg cursor-pointer transition-all duration-300 ease-out border-2 border-white">
                          <Image src={vehicle.image_url} width={70} height={70} className='rounded-lg object-cover w-[20%]' alt='vehicle' />
                          <div className="flex items-center justify-between w-full">
                            <div className="">
                              <p className="text-sm">Salihu 124</p>
                              <p className='font-semibold'>{limitedName}</p>
                              <p className="text-sm">Capacity: 10 Tons</p>
                            </div>
                            <div>
                              <p className="">15 km away</p>
                              <p className="">2:05pm</p>
                            </div>
                            <p className="text-sm">NGN{vehicle.price}</p>
                          </div>
                        </div>
                      );
                    })}

                    {!vehicleData.length && (
                      <p className='text-center'>No vehicles available</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <p className="font-semibold text-2xl">Review Your Order</p>
            <p className='py-3'>Review your payment details and confirm to complete your order</p>
            <hr />
            <div className="py-5">
              <div className="flex items-center space-x-5">
                <Image src={vehicleData[0]?.image_url} width={70} height={70} className='rounded-lg object-cover' alt='vehicle' />
                <div>
                  <p className="text-sm">Salihu 124</p>
                  <p>{vehicleData[0]?.name}</p>
                </div>
              </div>

              <div className='space-y-3 mt-5'>
                <div className="flex items-center w-full justify-between">
                  <p>Order Type</p>
                  <p className="font-semibold">Truck order</p>
                </div>
                <div className="flex items-center w-full justify-between">
                  <p>Order ID</p>
                  <p className="font-semibold">344-544-897</p>
                </div>
                <div className="flex items-center w-full justify-between">
                  <p>Pick-Up Location</p>
                  <p className="font-semibold">Yan Kaba Market</p>
                </div>
                <div className="flex items-center w-full justify-between">
                  <p>Drop-off Location</p>
                  <p className="font-semibold">Sabon Gari Market</p>
                </div>
                <div className="flex items-center w-full justify-between">
                  <p>Delivery Time</p>
                  <p className="font-semibold">2 Hours</p>
                </div>
                <div className="flex items-center w-full justify-between">
                  <p>Quantity</p>
                  <p className="font-semibold">2 Tons</p>
                </div>
                <div className="flex items-center w-full justify-between">
                  <p>Insurance</p>
                  <p className="font-semibold">NGN 2,300.00</p>
                </div>
                <div className="flex items-center w-full justify-between">
                  <p>Total Cost</p>
                  <p className="font-bold text-2xl">NGN 22,300.00</p>
                </div>
              </div>


            </div>
          </div>
        );
      case 8:
        return (
          <div>
            <p className="font-semibold text-2xl">Choose Payment Method</p>
            <div className="py-5">
              <div className="flex items-center justify-between py-5">
                <div className="flex items-center space-x-5">
                  <Image src={creditCard} height={50} width={50} alt='credit card' />
                  <h3 className="text-lg">Credit or Debit card</h3>
                </div>
                <input type="radio" name="payment" id="creditCard" />
              </div>
              <div className="flex items-center justify-between py-5">
                <div className="flex items-center space-x-5">
                  <Image src={transfer} height={50} width={50} alt='bank transfer' />
                  <h3 className="text-lg">Bank Transfer</h3>
                </div>
                <input type="radio" name="payment" id="transfer" />
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div>
            <p className="font-semibold text-2xl">Credit/Debit Card</p>
            <div className="py-5 space-y-5">
              <div className="flex flex-col space-y-2">
                <label htmlFor="cardNumber" className="font-semibold">Card Number</label>
                <input type="text" name="cardNumber" id="cardNumber" className="form-input" placeholder='Enter your card number' />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="expiryDate" className="font-semibold">Expiry Date</label>
                  <input type="text" name="expiryDate" id="expiryDate" className="form-input" maxLength='5' placeholder='MM/YY' />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="cvv" className="font-semibold">CVV</label>
                  <input type="text" name="cvv" id="cvv" className="form-input" maxLength='3' placeholder='3-digit security code' />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="cardholderName" className="font-semibold">Cardholder Name </label>
                <input type="text" name="cardholderName" id="cardholderName" className="form-input" placeholder='Enter your card name' />
              </div>

            </div>
          </div>
        );

      case 10:
        return (
          <div>
            <div className="my-20">
              <Image src={successful} height={50} width={50} className='mx-auto mb-5' alt='successful' />
              <h3 className="font-bold text-center">Payment Successful!</h3>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <Dialog transition open={isOpen} as="div" className="relative z-[9999] transition duration-300 ease-out" onClose={closeModal}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-xl bg-white p-6 backdrop-blur-2xl md:h-[27rem] h-[90%] overflow-y-auto overflow-hidden">
            <div className="flex items-center justify-end">
              {/* <p className="font-semibold text-2xl">Step {currentStep} of 10</p> */}
              <button onClick={closeModal}>
                <CloseCircle size="32" color="#000" variant="TwoTone" />
              </button>
            </div>

            {renderStepContent()}

            <div className="mt-8 flex justify-between">
              <button
                className={`flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 rounded-md ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft2 size="24" color="#000" variant="TwoTone" />
                Previous
              </button>

              <button
                className={`flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md ${currentStep === 10 ? 'hidden' : ''}`}
                onClick={nextStep}
                disabled={currentStep === 10}
              >
                Next
                <ArrowRight2 size="24" color="#FFF" variant="TwoTone" />
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-md ${currentStep === 10 ? 'block' : 'hidden'}`}
                // onClick={router.push('/dashboard')}
                onClick={closeModal}
              >
                Go to Dashboard
                <ArrowRight2 size="24" color="#FFF" variant="TwoTone" />
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
