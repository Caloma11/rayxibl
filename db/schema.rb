# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_18_094457) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "bookings", force: :cascade do |t|
    t.bigint "manager_id", null: false
    t.bigint "profile_id", null: false
    t.string "title"
    t.text "description"
    t.time "start_time"
    t.time "end_time"
    t.integer "duration"
    t.datetime "start_date"
    t.datetime "end_date"
    t.boolean "billable"
    t.integer "price"
    t.integer "total_price"
    t.integer "price_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manager_id"], name: "index_bookings_on_manager_id"
    t.index ["profile_id"], name: "index_bookings_on_profile_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "connections", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "profile_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_connections_on_company_id"
    t.index ["profile_id"], name: "index_connections_on_profile_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.bigint "manager_id", null: false
    t.bigint "profile_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manager_id"], name: "index_conversations_on_manager_id"
    t.index ["profile_id"], name: "index_conversations_on_profile_id"
  end

  create_table "job_applications", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.bigint "profile_id", null: false
    t.integer "status", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["job_id"], name: "index_job_applications_on_job_id"
    t.index ["profile_id"], name: "index_job_applications_on_profile_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.bigint "manager_id", null: false
    t.string "location"
    t.string "profession"
    t.text "description"
    t.string "rate"
    t.datetime "expiration_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "expertise"
    t.index ["manager_id"], name: "index_jobs_on_manager_id"
  end

  create_table "managers", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.bigint "user_id", null: false
    t.string "job_title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_managers_on_company_id"
    t.index ["user_id"], name: "index_managers_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "booking_id"
    t.bigint "user_id", null: false
    t.bigint "conversation_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["booking_id"], name: "index_messages_on_booking_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "notes", force: :cascade do |t|
    t.bigint "manager_id", null: false
    t.bigint "profile_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manager_id"], name: "index_notes_on_manager_id"
    t.index ["profile_id"], name: "index_notes_on_profile_id"
  end

  create_table "profile_attachments", force: :cascade do |t|
    t.bigint "profile_id", null: false
    t.string "title"
    t.string "url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["profile_id"], name: "index_profile_attachments_on_profile_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "profession"
    t.string "location"
    t.string "overview"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "expertise"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.bigint "profile_id", null: false
    t.bigint "manager_id", null: false
    t.integer "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["manager_id"], name: "index_ratings_on_manager_id"
    t.index ["profile_id"], name: "index_ratings_on_profile_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.integer "role"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
<<<<<<< HEAD
    t.integer "role"
=======
>>>>>>> master
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "bookings", "managers"
  add_foreign_key "bookings", "profiles"
  add_foreign_key "connections", "companies"
  add_foreign_key "connections", "profiles"
  add_foreign_key "conversations", "managers"
  add_foreign_key "conversations", "profiles"
  add_foreign_key "job_applications", "jobs"
  add_foreign_key "job_applications", "profiles"
  add_foreign_key "jobs", "managers"
  add_foreign_key "managers", "companies"
  add_foreign_key "managers", "users"
  add_foreign_key "messages", "bookings"
  add_foreign_key "messages", "conversations"
  add_foreign_key "messages", "users"
  add_foreign_key "notes", "managers"
  add_foreign_key "notes", "profiles"
  add_foreign_key "profile_attachments", "profiles"
  add_foreign_key "profiles", "users"
  add_foreign_key "ratings", "managers"
  add_foreign_key "ratings", "profiles"
end
