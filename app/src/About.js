import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  placeholder: {
    width: 40,
  },

  // Scroll View Styles
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 100,
  },

  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  
  logoContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    marginBottom: 10,
  },
  
  logoImage: {
    width: 120,
    height: 60,
  },
  
  logoBackground: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  customLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  
  nuLetterContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  
  nuLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  
  nuText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  
  eatsText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    fontStyle: 'italic',
    marginLeft: 2,
  },

  // Content Card
  contentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },

  // Title Section
  titleSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: '#4A5FBE',
    borderRadius: 2,
  },

  // Description Section
  descriptionSection: {
    marginBottom: 30,
  },
  
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#5D6D7E',
    textAlign: 'center',
    marginBottom: 15,
  },

  // Features Section
  featuresSection: {
    marginBottom: 25,
  },
  
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 8,
  },
  
  featureIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#F8F9FA',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  
  featureText: {
    fontSize: 15,
    color: '#495057',
    flex: 1,
    fontWeight: '500',
  },

  // Info Section
  infoSection: {
    marginTop: 10,
  },
  
  infoCard: {
    backgroundColor: '#F8F9FF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A5FBE',
  },
  
  infoText: {
    fontSize: 14,
    color: '#4A5FBE',
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 20,
  },

  // Floating Back Button
  floatingBackButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  
  floatingBackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5FBE',
  },
});

export default aboutStyles;