/*
  # Add Sample Data

  ## Overview
  Adds sample data for testing the trading platform

  ## Changes
  1. Additional cryptocurrencies
  2. Sample miners/staking products
  3. Test member account (without auth integration)
*/

-- Add more cryptocurrencies
INSERT INTO cryptocurrencies (title, logo, name, code, currency_type, options_tradeable, price_change, current_price, status, network)
VALUES
  ('ETH', 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 'ethusdt', 'ETH', 'ethusdt', true, 3.07, 4125.85, '上架', 'Ethereum'),
  ('XRP', 'https://cryptologos.cc/logos/ripple-xrp-logo.png', 'xrpusdt', 'XRP', 'xrpusdt', true, 2.84, 2.86248, '上架', 'Ripple'),
  ('DOGE', 'https://cryptologos.cc/logos/dogecoin-doge-logo.png', 'dogeusdt', 'DOGE', 'dogeusdt', true, 3.43, 0.236558, '上架', 'Dogecoin'),
  ('ADA', 'https://cryptologos.cc/logos/cardano-ada-logo.png', 'adausdt', 'ADA', 'adausdt', true, 4.35, 0.808888, '上架', 'Cardano')
ON CONFLICT DO NOTHING;

-- Get the cryptocurrency IDs for creating miners
DO $$
DECLARE
  btc_id bigint;
  eth_id bigint;
  usdt_id bigint;
BEGIN
  SELECT id INTO btc_id FROM cryptocurrencies WHERE code = 'BTC' LIMIT 1;
  SELECT id INTO eth_id FROM cryptocurrencies WHERE code = 'ETH' LIMIT 1;
  SELECT id INTO usdt_id FROM cryptocurrencies WHERE code = 'USDT' LIMIT 1;

  -- Add miners for BTC
  IF btc_id IS NOT NULL THEN
    INSERT INTO miners (cryptocurrency_id, miner_name, purchase_limit, play_time, minimum_rate, maximum_rate, buy_price, sort_order, status)
    VALUES
      (btc_id, 'Antminer', 10, 120, 1.86, 1.50, 600, 0, '上架'),
      (btc_id, 'Antminer', 10, 90, 1.30, 0.50, 500, 1, '上架'),
      (btc_id, 'Antminer', 10, 60, 0.90, 0.30, 300, 2, '上架'),
      (btc_id, 'Antminer', 10, 30, 0.64, 0.06, 50, 3, '上架')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Add miners for ETH
  IF eth_id IS NOT NULL THEN
    INSERT INTO miners (cryptocurrency_id, miner_name, purchase_limit, play_time, minimum_rate, maximum_rate, buy_price, sort_order, status)
    VALUES
      (eth_id, 'Antminer', 10, 30, 0.64, 0.06, 50, 0, '上架'),
      (eth_id, 'Antminer', 10, 60, 0.90, 0.30, 100, 1, '上架')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Add miners for USDT
  IF usdt_id IS NOT NULL THEN
    INSERT INTO miners (cryptocurrency_id, miner_name, purchase_limit, play_time, minimum_rate, maximum_rate, buy_price, sort_order, status)
    VALUES
      (usdt_id, 'Antminer', 10, 120, 1.86, 1.50, 600, 0, '上架'),
      (usdt_id, 'Antminer', 10, 90, 1.30, 0.50, 500, 1, '上架'),
      (usdt_id, 'Antminer', 10, 60, 0.90, 0.30, 300, 2, '上架'),
      (usdt_id, 'Antminer', 10, 30, 0.64, 0.06, 50, 3, '上架'),
      (usdt_id, 'Antminer', 10, 15, 0.14, 0.01, 10, 4, '上架')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
