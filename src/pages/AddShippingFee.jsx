import React, { useEffect, useState } from "react";
import ItemAdded from "../components/ItemAdded";
import { Select, Input, Form } from "antd";
import { countries } from "../countries"; // Assuming this is a static list of countries
import { createModifyShippingCost } from "../redux/products";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const AddShippingFee = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  const [addItem, setAddItem] = useState(false);
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
    const { states } = await import("../states");
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

  useEffect(() => {
    if (addItem) {
      const timer = setTimeout(() => {
        setAddItem(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [addItem]);

  const onSubmit = async () => {
    try {
      await createModifyShippingCost(
        {
          TOKEN: currentUser?.access_token,
          country: countryCode.label,
          stateName: stateCode.label,
          fee: shippingFee,
        },
        setAddItem
      );
    } catch (error) {}
  };

  return (
    <>
      {addItem && <ItemAdded text={addItem} />}
      <h2 className="edtit_header">Locations shipping fees</h2>
      <Form
        onFinish={onSubmit}
        className="flex add_shiping_fee_elements gap1rem"
      >
        <div className="flex gap05rem">
          <Form.Item
            required
            label="Country"
            name={"country"}
            rules={[{ required: true, message: "Country should be selected" }]}
            layout="vertical"
          >
            <Select
              style={{ width: 200 }}
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
              showSearch
            />
          </Form.Item>

          <Form.Item
            required
            label="State"
            name={"states"}
            rules={[{ required: true, message: "States should be selected" }]}
            layout="vertical"
          >
            <Select
              onChange={handleStateChange}
              style={{ width: 200 }}
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
        <Form.Item
          required
          label="fees"
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
            style={{ width: 200 }}
          />
        </Form.Item>
        <button type="submit" style={{}}>
          Add Fee
        </button>
      </Form>
    </>
  );
};

export default AddShippingFee;
