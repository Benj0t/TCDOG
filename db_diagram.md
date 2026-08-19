
Table users {
  id integer [primary key]
  username string
  email string
  password string
  created_at timestamp [default: `now()`]
}

Table cards {
  card_id string [primary key]
  name string [not null]
  serie string [not null, default ]
  description string [not null]
  image_url string
  rarity integer [note: "CHECK (rarity >= 1 AND rarity <= 6)"]  
}

Table user_cards {
  user_id integer [not null]
  card_id string [not null]
  quantity integer [not null, default: 1, note: 'CHECK (quantity >= 1)']
  obtained_at timestamp [default: `now()`]

  indexes {
    (user_id, card_id) [pk] // Clé primaire composite : un user n'a qu'une seule ligne par card_id
  }
}

Ref: user_cards.user_id > users.id [delete: cascade]
Ref: user_cards.card_id > cards.card_id [delete: cascade]