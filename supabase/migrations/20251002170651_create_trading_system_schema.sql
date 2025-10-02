/*
  # Trading System Database Schema

  ## Overview
  Creates the complete database schema for a cryptocurrency trading platform with options trading,
  member management, and administrative controls.

  ## 1. New Tables

  ### `cryptocurrencies`
  Stores information about available cryptocurrencies for trading
  - `id` (bigint, primary key)
  - `title` (text) - Display name (e.g., "XAUT")
  - `logo` (text) - URL to logo image
  - `name` (text) - Full name (e.g., "btcusdt")
  - `code` (text) - Trading code
  - `currency_type` (text) - Type of currency
  - `contract_address` (text) - Blockchain contract address
  - `options_tradeable` (boolean) - Can be traded as options
  - `price_change` (decimal) - Current price change percentage
  - `amount` (decimal) - Available amount
  - `user_withdrawal` (boolean) - Withdrawal enabled
  - `status` (text) - Status (上架/下架)
  - `current_price` (decimal) - Current trading price
  - `network` (text) - Blockchain network
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `miners`
  Mining/staking products available for users
  - `id` (bigint, primary key)
  - `cryptocurrency_id` (bigint, foreign key)
  - `miner_name` (text) - Name of miner/product
  - `purchase_limit` (integer) - Maximum purchases allowed
  - `play_time` (integer) - Duration in days
  - `minimum_rate` (decimal) - Minimum return rate
  - `maximum_rate` (decimal) - Maximum return rate
  - `buy_price` (decimal) - Purchase price
  - `sort_order` (integer) - Display order
  - `status` (text) - Status (上架/下架)
  - `created_at` (timestamptz)

  ### `members`
  User accounts and member information
  - `id` (bigint, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `avatar` (text) - Avatar URL
  - `login_name` (text, unique) - Login username
  - `email` (text, unique) - Email address
  - `phone` (text) - Phone number
  - `score` (integer) - User score/points
  - `invitation_code` (text, unique) - Referral code
  - `lose_all_amount` (decimal) - Total loss amount
  - `lose_all_times` (integer) - Number of losses
  - `win_all_amount` (decimal) - Total win amount
  - `win_all_times` (integer) - Number of wins
  - `test_account` (boolean) - Is test account
  - `superior_id` (text) - Referrer ID
  - `shareholder_id` (text) - Shareholder ID
  - `login_at` (timestamptz) - Last login time
  - `status` (text) - Account status
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `option_orders`
  Options trading orders/contracts
  - `id` (bigint, primary key)
  - `member_id` (bigint, foreign key)
  - `cryptocurrency_id` (bigint, foreign key)
  - `order_type` (text) - 'rise' or 'fall'
  - `amount` (decimal) - Trade amount in USDT
  - `duration` (integer) - Contract duration in seconds
  - `profit_rate` (decimal) - Expected profit rate
  - `start_price` (decimal) - Price when order placed
  - `end_price` (decimal) - Price when order completed
  - `result` (text) - 'win', 'lose', or 'pending'
  - `profit_loss` (decimal) - Actual profit or loss
  - `started_at` (timestamptz) - Order start time
  - `completed_at` (timestamptz) - Order completion time
  - `created_at` (timestamptz)

  ### `admin_users`
  Administrative users for backstage system
  - `id` (bigint, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `login_account` (text, unique) - Admin username
  - `avatar` (text) - Avatar URL
  - `role` (text) - Admin role
  - `user_group` (text) - Admin group
  - `superior_id` (text) - Manager ID
  - `shareholder_id` (text) - Shareholder ID
  - `phone` (text) - Contact phone
  - `email` (text) - Contact email
  - `login_times` (integer) - Login count
  - `status` (text) - Account status
  - `created_at` (timestamptz)

  ## 2. Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
  - Add policies for admin users to manage all data
*/

-- Create cryptocurrencies table
CREATE TABLE IF NOT EXISTS cryptocurrencies (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  logo text,
  name text NOT NULL,
  code text NOT NULL,
  currency_type text,
  contract_address text,
  options_tradeable boolean DEFAULT true,
  price_change decimal(10,2) DEFAULT 0,
  amount decimal(20,8) DEFAULT 0,
  user_withdrawal boolean DEFAULT true,
  status text DEFAULT '上架',
  current_price decimal(20,8) DEFAULT 0,
  network text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create miners table
CREATE TABLE IF NOT EXISTS miners (
  id bigserial PRIMARY KEY,
  cryptocurrency_id bigint REFERENCES cryptocurrencies(id) ON DELETE CASCADE,
  miner_name text NOT NULL,
  purchase_limit integer DEFAULT 10,
  play_time integer NOT NULL,
  minimum_rate decimal(10,2) NOT NULL,
  maximum_rate decimal(10,2) NOT NULL,
  buy_price decimal(20,8) NOT NULL,
  sort_order integer DEFAULT 0,
  status text DEFAULT '上架',
  created_at timestamptz DEFAULT now()
);

-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  avatar text,
  login_name text UNIQUE NOT NULL,
  email text UNIQUE,
  phone text,
  score integer DEFAULT 100,
  invitation_code text UNIQUE NOT NULL,
  lose_all_amount decimal(20,8) DEFAULT 0,
  lose_all_times integer DEFAULT 0,
  win_all_amount decimal(20,8) DEFAULT 0,
  win_all_times integer DEFAULT 0,
  test_account boolean DEFAULT false,
  superior_id text,
  shareholder_id text,
  login_at timestamptz,
  status text DEFAULT '正常',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create option_orders table
CREATE TABLE IF NOT EXISTS option_orders (
  id bigserial PRIMARY KEY,
  member_id bigint REFERENCES members(id) ON DELETE CASCADE,
  cryptocurrency_id bigint REFERENCES cryptocurrencies(id),
  order_type text NOT NULL CHECK (order_type IN ('rise', 'fall')),
  amount decimal(20,8) NOT NULL,
  duration integer NOT NULL,
  profit_rate decimal(10,2) NOT NULL,
  start_price decimal(20,8) NOT NULL,
  end_price decimal(20,8),
  result text DEFAULT 'pending' CHECK (result IN ('win', 'lose', 'pending')),
  profit_loss decimal(20,8) DEFAULT 0,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  login_account text UNIQUE NOT NULL,
  avatar text,
  role text NOT NULL,
  user_group text NOT NULL,
  superior_id text,
  shareholder_id text,
  phone text,
  email text,
  login_times integer DEFAULT 0,
  status text DEFAULT '正常',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE cryptocurrencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE miners ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE option_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Cryptocurrencies policies (public read, admin write)
CREATE POLICY "Anyone can view active cryptocurrencies"
  ON cryptocurrencies FOR SELECT
  USING (status = '上架');

CREATE POLICY "Admins can manage cryptocurrencies"
  ON cryptocurrencies FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.status = '正常'
    )
  );

-- Miners policies (public read, admin write)
CREATE POLICY "Anyone can view active miners"
  ON miners FOR SELECT
  USING (status = '上架');

CREATE POLICY "Admins can manage miners"
  ON miners FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.status = '正常'
    )
  );

-- Members policies
CREATE POLICY "Users can view own member data"
  ON members FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own member data"
  ON members FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all members"
  ON members FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.status = '正常'
    )
  );

-- Option orders policies
CREATE POLICY "Users can view own orders"
  ON option_orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM members
      WHERE members.id = option_orders.member_id
      AND members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own orders"
  ON option_orders FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM members
      WHERE members.id = option_orders.member_id
      AND members.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all orders"
  ON option_orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.status = '正常'
    )
  );

-- Admin users policies
CREATE POLICY "Admins can view other admins"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.status = '正常'
    )
  );

-- Insert sample cryptocurrency data
INSERT INTO cryptocurrencies (title, logo, name, code, currency_type, options_tradeable, status, current_price, network) VALUES
('BTC', 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', 'btcusdt', 'BTC', 'btcusdt', true, '上架', 112164.04, 'Bitcoin'),
('ETH', 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 'ethusdt', 'ETH', 'ethusdt', true, '上架', 3250.75, 'Ethereum'),
('USDT', 'https://cryptologos.cc/logos/tether-usdt-logo.png', 'usdt', 'USDT', 'usdt', false, '上架', 1.00, 'Tron')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_status ON cryptocurrencies(status);
CREATE INDEX IF NOT EXISTS idx_miners_status ON miners(status);
CREATE INDEX IF NOT EXISTS idx_members_user_id ON members(user_id);
CREATE INDEX IF NOT EXISTS idx_option_orders_member_id ON option_orders(member_id);
CREATE INDEX IF NOT EXISTS idx_option_orders_result ON option_orders(result);
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
