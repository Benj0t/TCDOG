Table users {
  id integer [primary key]
  username string [not null]
  email string [not null, unique]
  password string [not null]
  money integer [not null, default: 0, note: "CHECK (money >= 0)"]
  created_at timestamp [default: `now()`]
}

Table cards {
  card_id string [primary key]
  name string [not null]
  serie string [not null]
  description string [not null]
  image_url string
  rarity integer [note: "CHECK (rarity >= 1 AND rarity <= 6)"]  
}

Table user_cards {
  user_id integer [not null]
  card_id string [not null]
  quantity integer [not null, default: 1, note: "CHECK (quantity >= 1)"]
  obtained_at timestamp [default: `now()`]

  indexes {
    (user_id, card_id) [pk]
  }
}

Table boosters {
  id integer [primary key]
  name string [not null]
  cost integer [not null, note: "CHECK (cost >= 0)"]
  cards_count integer [not null, default: 5, note: "CHECK (cards_count > 0)"]
  serie string [note: "Permet de filtrer le pool de cartes par série"]
}

Table booster_drop_rates {
  id integer [primary key]
  booster_id integer [not null]
  rarity integer [not null, note: "CHECK (rarity >= 1 AND rarity <= 6)"]
  drop_rate decimal(5,4) [not null, note: "Ex: 0.7000 pour 70%"]

  indexes {
    (booster_id, rarity) [unique]
  }
}

Ref: user_cards.user_id > users.id [delete: cascade]
Ref: user_cards.card_id > cards.card_id [delete: cascade]
Ref: booster_drop_rates.booster_id > boosters.id [delete: cascade]