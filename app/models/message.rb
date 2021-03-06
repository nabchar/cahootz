# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  content    :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  channel_id :integer          not null
#

class Message < ApplicationRecord

  belongs_to :author,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :channel

end
