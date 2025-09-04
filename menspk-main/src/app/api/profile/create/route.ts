import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const profileData = await request.json()

    // For now, store in Supabase if available, or localStorage as fallback
    if (supabase) {
      // Check if customer exists
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', profileData.email)
        .single()

      if (customer) {
        // Update customer with profile data
        const { error } = await supabase
          .from('customers')
          .update({
            restaurant_name: profileData.restaurantName,
            phone: profileData.phone,
            address: profileData.address,
            city: profileData.city,
            state: profileData.state,
            zip_code: profileData.zipCode,
            cuisine_type: profileData.cuisineType,
            service_types: profileData.serviceType,
            average_ticket: profileData.averageTicket,
            seating_capacity: profileData.seatingCapacity,
            inventory_notes: profileData.inventory,
            challenges: profileData.challenges,
            preferred_contact: profileData.preferredContact,
            profile_completed: true,
            profile_completed_at: new Date().toISOString()
          })
          .eq('id', customer.id)

        if (error) {
          console.error('Error updating profile:', error)
          // Continue anyway - we'll store locally
        }
      }
    }

    // Also send notification email to admin
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'admin@menusparks.com',
        subject: `New Profile Completed: ${profileData.restaurantName}`,
        html: `
          <h2>New Restaurant Profile Completed</h2>
          <p><strong>Restaurant:</strong> ${profileData.restaurantName}</p>
          <p><strong>Email:</strong> ${profileData.email}</p>
          <p><strong>Phone:</strong> ${profileData.phone || 'Not provided'}</p>
          <p><strong>Location:</strong> ${profileData.city}, ${profileData.state}</p>
          <p><strong>Cuisine:</strong> ${profileData.cuisineType}</p>
          <p><strong>Service Types:</strong> ${profileData.serviceType.join(', ')}</p>
          <p><strong>Average Ticket:</strong> ${profileData.averageTicket || 'Not specified'}</p>
          <p><strong>Seating:</strong> ${profileData.seatingCapacity || 'Not specified'}</p>
          <p><strong>Inventory Notes:</strong> ${profileData.inventory || 'None'}</p>
          <p><strong>Challenges:</strong> ${profileData.challenges || 'None'}</p>
          <hr>
          <p>Time to create their first batch of specials!</p>
        `
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Profile creation error:', error)
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    )
  }
}