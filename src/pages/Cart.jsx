import React, { useMemo, useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { data, cart , updateCart } = useCart();

  const decreaseCartQuantity = useCallback(
    (productId) => {
      updateCart(productId, -1);
    },
    [updateCart],
  );

  const increaseCartQuantity = useCallback(
    (productId) => {
      updateCart(productId, 1);
    },
    [updateCart],
  );

  const Product = ({ product }) => (
    <div className="mb-4 grid min-h-full min-w-full  grid-rows-1 place-items-center gap-4 border-b pb-4 pt-4 middle:grid-cols-5 ">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="size-64 object-contain tablet:mx-8 middle:size-48"
      />
      <p className="items-center text-white middle:text-xl middle:font-semibold">
        {product.name}
      </p>
      <div className="flex flex-row gap-4 ">
        <button
          className=" px-2 py-2 text-white middle:block "
          onClick={() => decreaseCartQuantity(product.productId)}
          disabled={product.quantity <= 1}
        >
          -
        </button>
        <p className=" py-2 text-white middle:text-xl middle:font-semibold">
          {product.quantity}
        </p>
        <button
          className="  px-2 py-2 text-white middle:block "
          onClick={() => increaseCartQuantity(product.productId)}
        >
          +
        </button>
      </div>
      <span className="flex gap-4 text-white desktop:text-xl desktop:font-semibold">
        {" "}
        <p className="middle:hidden">Product price:</p> ${product.price}
      </span>

      <span className="flex gap-4 text-white desktop:text-xl desktop:font-semibold">
        <p className="middle:hidden">Product total:</p> $
        {(product.price * product.quantity).toFixed(2)}
      </span>
    </div>
  );

  return (
    <div className="h-full bg-black bg-cover">
      <Navbar />

      <div className="flex flex-row">
        <div className="w-full pt-36">
          <div className="mx-8 flex flex-col">
            <div className="grid min-h-full min-w-full grid-cols-5 items-center text-center middle:mb-4 middle:gap-4 middle:pb-4 middle:pt-4">
              <p className="mx-8 hidden text-white middle:block"></p>

              <p className="mx-8 hidden text-sm text-white middle:block middle:text-xl middle:font-bold">
                Product:{" "}
              </p>

              <p className="mx-8 hidden text-sm text-white middle:block middle:text-xl middle:font-bold">
                Quantity:{" "}
              </p>

              <p className="mx-8 hidden text-sm text-white middle:block middle:text-xl middle:font-bold">
                Price:{" "}
              </p>
              <p className="mx-8 hidden text-sm text-white middle:block middle:text-xl middle:font-bold">
                Product total:
              </p>
            </div>
            {cart?.map((product) => (
              <Product key={product.productId} product={product} />
            ))}
          </div>
          <p className="mb-8 text-center text-white desktop:mb-16 desktop:mt-8 desktop:text-2xl desktop:font-bold ">
            CART TOTAL: ${data?.price.toFixed(2)}
          </p>
          <div className="w-full px-16 py-8 text-center text-white">
            <a
              className="mb-4 block w-full cursor-pointer bg-brown px-4 py-2 hover:opacity-90"
              href="/Shop"
            >
              CONTINUE SHOPPING
            </a>
            <button className="mb-4 block w-full cursor-pointer bg-green-600 px-4 py-2 hover:bg-green-700">
              UPDATE CART
            </button>
            <a
              className="display:flex block w-full cursor-pointer bg-red-600 px-4 py-2 hover:bg-red-700"
              href=""
            >
              CHECKOUT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
