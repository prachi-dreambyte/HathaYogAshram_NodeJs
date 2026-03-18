const OnlineYogaTTC = require('../../models/courses/yogaTTC');
const fs = require('fs');
const path = require('path');

// @desc    Get all online yoga TTC content
// @route   GET /api/online-yoga-ttc
// @access  Public
const getAllContents = async (req, res) => {
  try {
    const contents = await OnlineYogaTTC.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contents.length,
      data: contents
    });
  } catch (error) {
    console.error('Error fetching contents:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contents',
      error: error.message
    });
  }
};

// @desc    Get single online yoga TTC content by ID
// @route   GET /api/online-yoga-ttc/:id
// @access  Public
const getContentById = async (req, res) => {
  try {
    const content = await OnlineYogaTTC.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching content',
      error: error.message
    });
  }
};

// Helper function to process array fields with images
const processArrayField = (field, files, prefix) => {
  if (!files || !Array.isArray(field)) return field;

  return field.map((item, index) => {
    const processedItem = { ...item };
    
    // Check if there's a file for this array item
    const fileKey = `${prefix}[${index}][image]`;
    if (files[fileKey]) {
      processedItem.image = `/uploads/${files[fileKey][0].filename}`;
    }
    
    return processedItem;
  });
};

// @desc    Create new online yoga TTC content
// @route   POST /api/online-yoga-ttc
// @access  Public
const createContent = async (req, res) => {
  try {
    const body = { ...req.body };
    
    // Handle single image uploads
    if (req.files && req.files['heroImage']) {
      body.heroImage = `/uploads/${req.files['heroImage'][0].filename}`;
    }
    
    if (req.files && req.files['whyUsImage']) {
      body.whyUsImage = `/uploads/${req.files['whyUsImage'][0].filename}`;
    }

    // Handle courses images
    if (body.courses) {
      try {
        body.courses = JSON.parse(body.courses);
        if (req.files) {
          body.courses = body.courses.map((course, index) => {
            const fileKey = `courses[${index}][image]`;
            if (req.files[fileKey]) {
              return {
                ...course,
                image: `/uploads/${req.files[fileKey][0].filename}`
              };
            }
            return course;
          });
        }
      } catch (e) {
        console.error('Error parsing courses:', e);
      }
    }

    // Handle booking courses images
    if (body.bookingCourses) {
      try {
        body.bookingCourses = JSON.parse(body.bookingCourses);
        if (req.files) {
          body.bookingCourses = body.bookingCourses.map((course, index) => {
            const fileKey = `bookingCourses[${index}][image]`;
            if (req.files[fileKey]) {
              return {
                ...course,
                image: `/uploads/${req.files[fileKey][0].filename}`
              };
            }
            return course;
          });
        }
      } catch (e) {
        console.error('Error parsing bookingCourses:', e);
      }
    }

    // Handle testimonials (no images)
    if (body.testimonials) {
      try {
        body.testimonials = JSON.parse(body.testimonials);
      } catch (e) {
        console.error('Error parsing testimonials:', e);
      }
    }

    // Handle whyUsBenefits (no images)
    if (body.whyUsBenefits) {
      try {
        body.whyUsBenefits = JSON.parse(body.whyUsBenefits);
      } catch (e) {
        console.error('Error parsing whyUsBenefits:', e);
      }
    }

    // Handle certification logos
    if (body.certificationLogos) {
      try {
        body.certificationLogos = JSON.parse(body.certificationLogos);
        if (req.files) {
          body.certificationLogos = body.certificationLogos.map((logo, index) => {
            const fileKey = `certificationLogos[${index}][image]`;
            if (req.files[fileKey]) {
              return {
                ...logo,
                image: `/uploads/${req.files[fileKey][0].filename}`
              };
            }
            return logo;
          });
        }
      } catch (e) {
        console.error('Error parsing certificationLogos:', e);
      }
    }

    // Handle steps (no images)
    if (body.steps) {
      try {
        body.steps = JSON.parse(body.steps);
      } catch (e) {
        console.error('Error parsing steps:', e);
      }
    }

    const content = await OnlineYogaTTC.create(body);
    
    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: content
    });
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating content',
      error: error.message
    });
  }
};

// @desc    Update online yoga TTC content
// @route   PUT /api/online-yoga-ttc/:id
// @access  Public
const updateContent = async (req, res) => {
  try {
    let content = await OnlineYogaTTC.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    const body = { ...req.body };
    
    // Handle single image uploads
    if (req.files && req.files['heroImage']) {
      // Delete old image if exists
      if (content.heroImage) {
        const oldImagePath = path.join(__dirname, '..', content.heroImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      body.heroImage = `/uploads/${req.files['heroImage'][0].filename}`;
    }
    
    if (req.files && req.files['whyUsImage']) {
      // Delete old image if exists
      if (content.whyUsImage) {
        const oldImagePath = path.join(__dirname, '..', content.whyUsImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      body.whyUsImage = `/uploads/${req.files['whyUsImage'][0].filename}`;
    }

    // Handle courses images
    if (body.courses) {
      try {
        const newCourses = JSON.parse(body.courses);
        const oldCourses = content.courses || [];
        
        body.courses = newCourses.map((course, index) => {
          // Check if there's a new image uploaded for this course
          const fileKey = `courses[${index}][image]`;
          if (req.files && req.files[fileKey]) {
            // Delete old image if exists
            if (oldCourses[index] && oldCourses[index].image) {
              const oldImagePath = path.join(__dirname, '..', oldCourses[index].image);
              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              }
            }
            return {
              ...course,
              image: `/uploads/${req.files[fileKey][0].filename}`
            };
          }
          // Keep old image if no new one
          return {
            ...course,
            image: oldCourses[index]?.image || course.image || ''
          };
        });
      } catch (e) {
        console.error('Error parsing courses:', e);
      }
    }

    // Handle booking courses images
    if (body.bookingCourses) {
      try {
        const newBookingCourses = JSON.parse(body.bookingCourses);
        const oldBookingCourses = content.bookingCourses || [];
        
        body.bookingCourses = newBookingCourses.map((course, index) => {
          const fileKey = `bookingCourses[${index}][image]`;
          if (req.files && req.files[fileKey]) {
            // Delete old image if exists
            if (oldBookingCourses[index] && oldBookingCourses[index].image) {
              const oldImagePath = path.join(__dirname, '..', oldBookingCourses[index].image);
              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              }
            }
            return {
              ...course,
              image: `/uploads/${req.files[fileKey][0].filename}`
            };
          }
          return {
            ...course,
            image: oldBookingCourses[index]?.image || course.image || ''
          };
        });
      } catch (e) {
        console.error('Error parsing bookingCourses:', e);
      }
    }

    // Handle testimonials (no images)
    if (body.testimonials) {
      try {
        body.testimonials = JSON.parse(body.testimonials);
      } catch (e) {
        console.error('Error parsing testimonials:', e);
      }
    }

    // Handle whyUsBenefits (no images)
    if (body.whyUsBenefits) {
      try {
        body.whyUsBenefits = JSON.parse(body.whyUsBenefits);
      } catch (e) {
        console.error('Error parsing whyUsBenefits:', e);
      }
    }

    // Handle certification logos
    if (body.certificationLogos) {
      try {
        const newLogos = JSON.parse(body.certificationLogos);
        const oldLogos = content.certificationLogos || [];
        
        body.certificationLogos = newLogos.map((logo, index) => {
          const fileKey = `certificationLogos[${index}][image]`;
          if (req.files && req.files[fileKey]) {
            // Delete old image if exists
            if (oldLogos[index] && oldLogos[index].image) {
              const oldImagePath = path.join(__dirname, '..', oldLogos[index].image);
              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              }
            }
            return {
              ...logo,
              image: `/uploads/${req.files[fileKey][0].filename}`
            };
          }
          return {
            ...logo,
            image: oldLogos[index]?.image || logo.image || ''
          };
        });
      } catch (e) {
        console.error('Error parsing certificationLogos:', e);
      }
    }

    // Handle steps (no images)
    if (body.steps) {
      try {
        body.steps = JSON.parse(body.steps);
      } catch (e) {
        console.error('Error parsing steps:', e);
      }
    }

    // Update the content
    content = await OnlineYogaTTC.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Content updated successfully',
      data: content
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating content',
      error: error.message
    });
  }
};

// @desc    Delete online yoga TTC content
// @route   DELETE /api/online-yoga-ttc/:id
// @access  Public
const deleteContent = async (req, res) => {
  try {
    const content = await OnlineYogaTTC.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Delete hero image if exists
    if (content.heroImage) {
      const heroImagePath = path.join(__dirname, '..', content.heroImage);
      if (fs.existsSync(heroImagePath)) {
        fs.unlinkSync(heroImagePath);
      }
    }

    // Delete why us image if exists
    if (content.whyUsImage) {
      const whyUsImagePath = path.join(__dirname, '..', content.whyUsImage);
      if (fs.existsSync(whyUsImagePath)) {
        fs.unlinkSync(whyUsImagePath);
      }
    }

    // Delete course images
    if (content.courses && content.courses.length > 0) {
      content.courses.forEach(course => {
        if (course.image) {
          const courseImagePath = path.join(__dirname, '..', course.image);
          if (fs.existsSync(courseImagePath)) {
            fs.unlinkSync(courseImagePath);
          }
        }
      });
    }

    // Delete booking course images
    if (content.bookingCourses && content.bookingCourses.length > 0) {
      content.bookingCourses.forEach(course => {
        if (course.image) {
          const courseImagePath = path.join(__dirname, '..', course.image);
          if (fs.existsSync(courseImagePath)) {
            fs.unlinkSync(courseImagePath);
          }
        }
      });
    }

    // Delete certification logo images
    if (content.certificationLogos && content.certificationLogos.length > 0) {
      content.certificationLogos.forEach(logo => {
        if (logo.image) {
          const logoImagePath = path.join(__dirname, '..', logo.image);
          if (fs.existsSync(logoImagePath)) {
            fs.unlinkSync(logoImagePath);
          }
        }
      });
    }

    await OnlineYogaTTC.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting content',
      error: error.message
    });
  }
};

module.exports = {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent
};