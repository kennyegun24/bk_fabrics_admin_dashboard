"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Select, Input, Form } from "antd";
import { countries } from "@/countries"; // Assuming this is a static list of countries
import { createModifyShippingCost } from "@/redux/apiCalls";
import { useSelector } from "react-redux";
import { toast } from "sonner";
const Page = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [countryCode, setCountryCode] = useState({
    value: null,
    label: null,
  });
  const [stateCode, setStateCode] = useState({
    value: null,
    label: null,
  });
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [shippingFee, setShippingFee] = useState("");
  const [loading, setLoading] = useState({
    countries: false,
    states: false,
  });

  useEffect(() => {
    setLoading((prev) => ({ ...prev, countries: true }));
    setCountryList(countries);
    setLoading((prev) => ({ ...prev, countries: false }));
  }, []);

  const handleCountryChange = (value, e) => {
    setCountryCode(e);
  };

  const handleFeeChange = (e) => {
    setShippingFee(e.target.value);
  };

  const handleStateChange = (value, e) => {
    setStateCode(e);
  };

  const onStatesFocus = async () => {
    setLoading((prev) => ({ ...prev, states: true }));
    const { states } = await import("@/states");
    const selectedCountry = states?.find(
      (state) => state.country.toLowerCase() === countryCode.value
    );
    if (selectedCountry) {
      setStateList(
        selectedCountry.states || [
          {
            label: "No State Found",
            value: "Nan",
          },
        ]
      );
    }
    setLoading((prev) => ({ ...prev, states: false }));
  };

  const onSubmit = async () => {
    const toastId = toast.loading("Processing...");
    try {
      // toast.loading();
      await createModifyShippingCost({
        TOKEN: currentUser?.access_token,
        country: countryCode.label,
        stateName: stateCode.label,
        fee: shippingFee,
      });
      return toast.success("Shipping fee successfully added", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };
  return (
    <div className="new_form_container">
      <Form onFinish={onSubmit}>
        <h1>Add new product</h1>
        <hr />
        <div className="horizontal_inputs_container">
          <Form.Item
            required
            label={<span style={{ color: "#fff" }}>Country</span>}
            name={"country"}
            rules={[{ required: true, message: "Country should be selected" }]}
            layout="vertical"
          >
            <Select
              style={{ width: 200, height: "calc(2rem + 14px)" }}
              onChange={handleCountryChange}
              options={countryList.map((country) => ({
                label: country.name,
                value: country.alpha2,
              }))}
              loading={loading.countries}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              dropdownStyle={{ color: "#fff" }}
              showSearch
            />
          </Form.Item>
          <div>
            <label htmlFor="">Shipping Fee:</label>
            <Form.Item
              required
              // label="fees"
              name={"Shipping fee"}
              rules={[
                {
                  required: true,
                  message: "Shipping fee should not be empty",
                },
              ]}
              layout="vertical"
            >
              <Input
                type="number"
                placeholder="Shipping Fee"
                value={shippingFee}
                onChange={handleFeeChange}
                // style={{ width: 200, height }}
                style={{ height: "calc(2rem + 14px)" }}
              />
            </Form.Item>
          </div>
        </div>
        <div className="horizontal_inputs_container">
          <Form.Item
            required
            label={<span style={{ color: "#fff" }}>State</span>}
            name={"states"}
            rules={[{ required: true, message: "States should be selected" }]}
            layout="vertical"
          >
            <Select
              style={{ width: 200, height: "calc(2rem + 14px)" }}
              onChange={handleStateChange}
              // style={{ width: 200 }}
              options={stateList.map((state) => ({
                label: state.name,
                value: state.code,
              }))}
              loading={loading.states}
              onFocus={onStatesFocus}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
            />
          </Form.Item>
        </div>
        <button
          style={{
            background: "#91C3F4",
            padding: "1rem 1.5rem",
            border: "none",
            width: "fit-content",
            fontWeight: 700,
            borderRadius: "8px",
            alignSelf: "center",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            cursor: "pointer",
          }}
          type="submit"
        >
          <FaPlus style={{ background: "transparent" }} />
          Add Shipping Fee
        </button>
      </Form>
    </div>
  );
};

export default Page;
